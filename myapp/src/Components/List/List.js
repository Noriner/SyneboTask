import React, { useState } from 'react';
import styles from "./List.module.scss";

function ListToDo(){

    const [todo,setTodo] = useState('');
    const [todos,setTodos] = useState([]);

    const handleInputChange = (e) => {
        setTodo(e.target.value);
    };

    const handleAddTask = () => {
        if (todo.trim()) {
        setTodos([...todos, todo]);
        setTodo('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key ==='Enter'){
            handleAddTask();
        }
    }

    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.wrapper_list}>
                    <div className={styles.list_input}>
                        <div className={styles.list_checkbox}>
                            a
                        </div>
                        <input
                            type="text"
                            value={todo}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Create a new todo..."
                        />
                    </div>
                    <div className={styles.list_output}>
                        <ul>
                            {todos.map((todo, index) =>(
                                <li key={index}><div>a</div><div className={styles.todo}>{todo}</div></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListToDo;