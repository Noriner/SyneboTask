import React from 'react';
import styles from "./MainPage.module.scss";
import ListToDo from '../../Components/List/List';

const MainPage = () =>{

    return(
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Todo</h1>
            <ListToDo />
        </div>
    )
}

export default MainPage;