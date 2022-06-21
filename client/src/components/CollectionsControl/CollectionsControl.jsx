import React, {useEffect, useState} from 'react';
import "./CollectionsControl.css"
import config from "../../config";
import {BsFillPencilFill, BsFillTrashFill, BsCollectionFill} from "react-icons/bs";
import AddCollection from "../AddCollection/AddCollection";
import axios from "axios";
import EditCollection from "../EditCollection/EditCollection";
import CollectionManager from "../CollectionManager/CollectionManager";
import "./CollectionsControl.css"

const CollectionsControl = () => {
    const [modalActive, setModalActive] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [collActive, setCollActive] = useState(false)
    const [currentColl, setCurrentColl] = useState(1)
    const [collectionsItem, setCollectionsItem] = useState([])

    useEffect(() => {
        const getCollections = async () => {
            await axios.get(config.url + "/collection/get").then(response => {
                setCollectionsItem(response.data.collections)
            })
        }
        getCollections()
    }, [currentColl, modalActive, editActive, collActive])


    const editCollections = (e) => {
        setEditActive(true)
        setCurrentColl(e)
    }

    const collCollections = (e) => {
        setCollActive(true)
        setCurrentColl(e)
    }

    const deleteCollections = async (e) => {
        try{
            await axios.post(config.url + "/collection/delete", {id_coll: e})
            await axios.get(config.url + "/collection/get").then(response => {
                setCollectionsItem(response.data.collections)
            })
        }catch (e) {

        }
    }

    return (
        <div>
            <div className={"createfilm_title"}>
                <h1>Подборки</h1>
                <button onClick={() => setModalActive(!modalActive)}>Добавить подборку</button>
            </div>
            <AddCollection activeModal={modalActive} setActiveModal={setModalActive}/>
            <EditCollection currentColl={currentColl} activeModal={editActive} setActiveModal={setEditActive}/>
            <CollectionManager currentColl={currentColl} activeModal={collActive} setActiveModal={setCollActive}/>
            <div>
                <table border="1" width="100%" cellPadding="5" className="formcontrol_table">
                    <thead>
                    <tr className="collControl_th">
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Количество фильмов</th>
                        <th></th>
                    </tr>
                    {
                        collectionsItem.map(
                            collection => {
                                return (
                                    <tr key={collection.id} className="coll_control_tr">
                                        <td>{collection.name}</td>
                                        <td>{collection.description}</td>
                                        <td>{collection.countcontent}</td>
                                        <td>
                                            <BsFillPencilFill className="formcontrol_button_edit" onClick={() => editCollections(collection.id)}/>
                                            <BsCollectionFill className="formcontrol_button_edit" onClick={() => collCollections(collection.id)}/>
                                            <BsFillTrashFill className="formcontrol_button_delete" onClick={() => deleteCollections(collection.id)}/>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default CollectionsControl;