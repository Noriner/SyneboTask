import React from 'react';
import styles from "./MainPage.module.scss";
import ListToDo from '../../Components/List/List';

const MainPage = () =>{

    return(
        <div className={styles.wrapper}>
            <div className={styles.background_box}></div>
            <div className={styles.list_box}>
                <h1 className={styles.title}>Todo</h1>
                <ListToDo />
                <div className={styles.draganddrop_info}>
                    Drag and drop to reorder list when All elements displayed
                </div>
            </div>
        </div>
    )
}

export default MainPage;