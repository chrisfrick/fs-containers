import React from 'react'
import ReactDOM from 'react-dom'
import Todo from "./Todo"

it('renders without crashing', () => {
  const todo = {
    text: 'Test todos',
    done: false,
  }
  const doneInfo = 'done'
  const notDoneInfo = 'not done'
  const div = document.createElement('div')
  ReactDOM.render(<Todo todo={todo} doneInfo={doneInfo} notDoneInfo={notDoneInfo}/>, div)
})