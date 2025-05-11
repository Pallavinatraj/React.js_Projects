import React, { useRef, useState, useEffect } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();

    const add = () => {
        const input = inputRef.current.value.trim();

        if (input === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),  //it generates the new value 
            text: input,
            isComplete: false
        }

        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        setTodoList((preTodo) => {
            return preTodo.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id) => {
        setTodoList((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete }
                }
                return todo;
            })
        })
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todoList));
    }, [todoList]);


    return (
        <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl '>

            {/* .....title..... */}
            <div className='flex items-center mt-7 gap-2'>
                <img className='w-8' src={todo_icon} alt='todo'></img>
                <h1 className='text-3xxl font-semibold'>TO-DO List</h1>
            </div>

            {/* .....Input Button..... */}
            <div className='flex items-center my-7 bg-gray-100 rounded-full'>
                <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-16 pr-2 placeholder:text-slate-600' type="text" placeholder='Add You Task' />
                <button onClick={add} className='border-0 bg-orange-600 rounded-full w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add +</button>
            </div>

            {/* ......Todo List...... */}
            <div>
                {todoList.map((item, index) => {
                    return <TodoItems text={item.text} key={index} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
                })}
            </div>


        </div>
    )
}

export default Todo
