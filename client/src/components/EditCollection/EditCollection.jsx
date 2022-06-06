import React, {useState, useEffect} from 'react';
import Modal from "../Modal/Modal";
import axios from "axios";
import config from "../../config"

const EditCollection = ({currentColl, activeModal, setActiveModal}) => {

    const [collectionsForm, setCollectionsForm] = useState({
        name: '',
        description: ''
    })

    useEffect(() => {
        const getCollection = async () => {
            await axios.post(config.url + "/collection/current", {id_coll: currentColl}).then(response => {
                setCollectionsForm({
                    name: response.data.coll.name,
                    description: response.data.coll.description
                })
            })
        }
        getCollection()
    }, [activeModal, currentColl])

    const editCollHandler = async () => {
        await axios.post(config.url + "/collection/edit", {...collectionsForm, id_coll: currentColl}).then(response => {
            setActiveModal(false)
        })
    }

    return (
        <Modal active={activeModal} setActive={setActiveModal}>
            <div className="collection_container">
                <h1>Изменить подборку</h1>
                <input type="text" placeholder="Введите название" value={collectionsForm.name} onChange={e => setCollectionsForm({...collectionsForm, name: e.target.value})}/>
                <textarea placeholder="Введите описание" value={collectionsForm.description} onChange={e => setCollectionsForm({...collectionsForm, description: e.target.value})}/>
                <button onClick={editCollHandler}>Изменить подборку</button>
            </div>
        </Modal>
    );
};

export default EditCollection;