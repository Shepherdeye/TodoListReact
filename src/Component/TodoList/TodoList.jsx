import React, { useRef, useState, useEffect } from 'react';
import './TodoList.css';

export const TodoList = () => {
    const [todo, setTodo] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const myReff = useRef(null);

    // Save todos to local storage whenever todo state changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todo));
    }, [todo]);

    // Add a todo
    const handleAddTodo = () => {
        const myvalue = myReff.current.value;
        const newValue = { myvalue, completed: false };
        if (myvalue !== '') {
            setTodo([...todo, newValue]);
            myReff.current.value = '';
        }
    };

    const handleListClick = (key) => {
        const todoValue = [...todo];
        todoValue[key].completed = !todoValue[key].completed;
        setTodo(todoValue);
    };

    const handleDeleted = (key) => {
        const myNewValue = [...todo];
        myNewValue.splice(key, 1);
        setTodo(myNewValue);
    };

    return (
        <div className='todoList-container'>
            <h1 className='todo-title'>To Do List</h1>
            <ul className="todo-list">
                {todo.map(({ myvalue, completed }, key) => (
                    <div className='todo-li-container' key={key}>
                        <li onClick={() => handleListClick(key)} className={completed ? "done" : ""}  >{myvalue}</li>
                        <div className='delete-btn'>
                            <span onClick={() => handleDeleted(key)}>❌</span>
                        </div>
                    </div>
                ))}
            </ul>
            <input ref={myReff} className='add-input' type="text" placeholder=' Enter a value...' maxLength={50} />
            <button className='add-btn' onClick={handleAddTodo}>Add Todo</button>
        </div>
    );
};
