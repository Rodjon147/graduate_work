import React from 'react';
import styles from "./NotFoundPage.module.css"

const NotFoundPage = () => {
    return (
        <div className={styles.cont}>
           <h1>404</h1>
            <h3>Страница не найдена :(</h3>
        </div>
    );
};

export default NotFoundPage;