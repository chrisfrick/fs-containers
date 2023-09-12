const express = require('express');
const redis = require('../redis');
const router = express.Router();

/* Get added_todos count */
router.get('/', async (_req, res) => {
  let addedTodos = await redis.getAsync('added_todos')
  if (!addedTodos) {
    addedTodos = 0
  }
  const response = { added_todos: Number(addedTodos)}
  console.log(response)
  res.send(response)
})

module.exports = router