import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import "./AddCollection.css"
import config from "../../config"
import axios from "axios";

const AddCollection = ({activeModal, setActiveModal}) => {
    const [collectionsForm, setCollectionsForm] = useState({
        name: '',
        description: ''
    })

    const addCollectionsHandler = async () => {
        try {
            await axios.post(config.url + "/collection/add", {...collectionsForm}).then(response => {
                setActiveModal(false)
            })
        }catch (e) {

        }
    }

    return (
        <Modal active={activeModal} setActive={setActiveModal}>
            <div className="collection_container">
                <h1>Добавить подборку</h1>
                <input type="text" placeholder="Введите название" value={collectionsForm.name} onChange={e => setCollectionsForm({...collectionsForm, name: e.target.value})}/>
                <textarea placeholder="Введите описание" value={collectionsForm.description} onChange={e => setCollectionsForm({...collectionsForm, description: e.target.value})}/>
                <button onClick={addCollectionsHandler}>Добавить подборку</button>
            </div>
        </Modal>
    );
};

export default AddCollection;