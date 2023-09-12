const express = require('express');
const { Todo } = require('../mongo');
const redis = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  let addedTodos = await redis.getAsync('added_todos')
  addedTodos = Number(addedTodos) + 1
  await redis.setAsync('added_todos', addedTodos)
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const id = req.todo
  const todo = {
    text: req.body.text,
    done: req.body.done
  }

  const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true })
  console.log(updatedTodo)
  res.send(updatedTodo) // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
