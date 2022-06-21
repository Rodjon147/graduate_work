import React, {useState, useEffect} from 'react';
import Modal from "../Modal/Modal";
import config from "../../config";
import axios from "axios";
import "./CollectionManager.css"

const CollectionManager = ({currentColl, activeModal, setActiveModal}) => {
    const [itemsList, setItemsList] = useState([])

    useEffect(() => {
        const searchHandler = async () => {
            try {
                await axios.post(config.url + "/collection/film", {id_coll: currentColl}).then(response => {
                    setItemsList(response.data.films)
                })
            }catch (e) {

            }
        }
        searchHandler()
    }, [currentColl, activeModal])


    const contentHandler = async (id_film) => {
        try {
            await axios.post(config.url + "/collection/content", {id_coll: currentColl, id_film})
            await axios.post(config.url + "/collection/film", {id_coll: currentColl}).then(response => {
                setItemsList(response.data.films)
            })
        }catch (e) {

        }
    }

    const deleteContentHandler = async (id_film) => {
        try {
            await axios.post(config.url + "/collection/delete-content", {id_coll: currentColl, id_film})
            await axios.post(config.url + "/collection/film", {id_coll: currentColl}).then(response => {
                setItemsList(response.data.films)
            })
        }catch (e) {

        }
    }

    return (
        <Modal active={activeModal} setActive={setActiveModal}>
            <div className="coll_container">
                <h1>Содержимое подборки</h1>
                <div className="coll_items">
                    {
                        itemsList.map(
                            item => {
                                return(
                                    <div key={item.id} className="coll_item">
                                        <img src={config.url + "/" + item.cover} alt={item.id}/>
                                        <div className="search_info">
                                            <h3>{item.name}</h3>
                                            <p>{item.estimation}</p>
                                        </div>
                                        {
                                            item.content ?
                                                <button onClick={() => deleteContentHandler(item.id)}>Удалить</button>
                                                :
                                                <button onClick={() => contentHandler(item.id)}>Добавить</button>
                                        }

                                    </div>
                                )
                            }
                        )
                    }

                </div>
            </div>
        </Modal>
    );
};

export default CollectionManager;