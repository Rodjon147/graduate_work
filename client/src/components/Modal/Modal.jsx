import React from 'react';
import './Modal.css'

const Modal = ({active, setActive, children}) => {
    return (
        <React.Fragment>
            <div className={active ? "modal_content active" : "modal_content"}>
                {children}
            </div>
            <div className={active ? "modal active" : "modal"}  onClick={() => setActive(false)}></div>
        </React.Fragment>
    );
};

export default Modal;