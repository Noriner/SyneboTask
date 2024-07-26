import React, { useState } from 'react';
import styles from "./List.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck} from '@fortawesome/free-solid-svg-icons';

function ListToDo(){

    const [todo,setTodo] = useState('');
    const [todos,setTodos] = useState([]);

    const handleInputChange = (e) => {
        setTodo(e.target.value);
    };

    const handleAddTodo = () => {
        if (todo.trim()) {
        setTodos([...todos, {text: todo, done: false}]);
        setTodo('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key ==='Enter'){
            handleAddTodo();
        }
    }

    const toggleTodoDone = (index) => {
        const newTodos = todos.map((todo, idx) => {
            if (index === idx) {
                return { ...todo, done: !todo.done };
            }
            return todo;
        });
        setTodos(newTodos);
    };


    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.wrapper_list}>
                    <div className={styles.list_input}>
                        <div className={styles.list_checkbox}>
                            <FontAwesomeIcon icon={faCircle} />
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
                            {todos.map((todo, index) => (
                                <li key={index} onClick={() => toggleTodoDone(index)} className={todo.done ? styles.done : ''}>
                                    <div className={styles.output_checkbox}>
                                        <FontAwesomeIcon icon={todo.done ? faCircleCheck : faCircle} />
                                    </div>
                                    <div className={styles.todo}>{todo.text}</div>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.user_controll}>
                            <div className={styles.counter}>Counter</div>
                            <div className={styles.button}>All</div>
                            <div className={styles.button}>Active</div>
                            <div className={styles.button}>Completed</div>
                            <div className={styles.button}>Clear Completed</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListToDo;