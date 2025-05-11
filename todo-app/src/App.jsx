import React from "react"
import Todo from "./components/Todo.jsx"
import TodoItems from "./components/TodoItems.jsx"

const App = () => {
  return (
    <div className='bg-black grid py-4 min-h-screen'>
      <Todo />
    </div >
  )
}

export default App