import React, { useState } from 'react';
import styles from "./List.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck} from '@fortawesome/free-solid-svg-icons';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ListToDo(){

    const [todo,setTodo] = useState('');
    const [todos,setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

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

    const filteredTodos = () => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.done);
            case 'completed':
                return todos.filter(todo => todo.done);
            default:
                return todos;
        }
    };

    const clearCompletedTodos = () => {
        const newTodos = todos.filter(todo => !todo.done);
        setTodos(newTodos);
    };

    const remainingTodo = todos.filter(todo => !todo.done).length;

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const reorderedTodos = Array.from(todos);
        const [movedItem] = reorderedTodos.splice(result.source.index, 1);
        reorderedTodos.splice(result.destination.index, 0, movedItem);

        setTodos(reorderedTodos);
    }

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
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="todo">
                                {(provided) => (
                                    <ul 
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >                            
                                        {filteredTodos().map((todo, index) => (
                                            <Draggable
                                                key={index}
                                                draggableId={`todo-${index}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        onClick={() => toggleTodoDone(index)}
                                                        className={todo.done ? styles.done : ''}
                                                    >
                                                        <div>
                                                            <FontAwesomeIcon icon={todo.done ? faCircleCheck : faCircle} />
                                                        </div>
                                                        <div className={styles.todo}>{todo.text}</div>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>                        
                        <div className={styles.user_controll}>
                            <div className={styles.counter}>
                                {remainingTodo} items left
                            </div>
                            <div className={styles.button} onClick={() => setFilter('default')}>All</div>
                            <div className={styles.button} onClick={() => setFilter('active')}>Active</div>
                            <div className={styles.button} onClick={() => setFilter('completed')}>Completed</div>
                            <div className={styles.button} onClick={clearCompletedTodos}>Clear Completed</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListToDo;