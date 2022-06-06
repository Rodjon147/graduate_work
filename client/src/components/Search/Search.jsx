import React, {useEffect, useState} from 'react';
import { BsAspectRatio } from "react-icons/bs";
import "./Search.css"
import config from "../../config"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Search = () => {
    const [searchInput, setSearchInput] = useState('')
    const [itemsList, setItemsList] = useState([])
    const [activeList, setActiveList] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const searchHandler = async () => {
            try {
                await axios.get(config.url + "/manager/film").then(response => {
                    setItemsList(response.data.films)
                })
            }catch (e) {

            }
        }
        searchHandler()
    }, [activeList])

    useEffect(() => {
        if(searchInput.length > 0){
            setActiveList(true)
        }else{
            setActiveList(false)
        }
    }, [searchInput])

    const filterFilms = itemsList.filter(itemsList => {
        return itemsList.name.toLowerCase().includes(searchInput.toLowerCase())
    })

    const filmOpenHandler = (e) => {
        navigate(`/film/${e}`)
        setSearchInput("")
    }

    return (
        <div className="search_container">
            <input type="text" placeholder="Поиск" className="search_input" value={searchInput} onChange={event => setSearchInput(event.target.value)}/>
            {
                activeList && (
                    <div className="search_list">

                        {
                            filterFilms.length > 0 ?
                                filterFilms.map(
                                    item => {
                                        return (
                                            <div key={item.id} className="search_item" onClick={() => filmOpenHandler(item.id)}>
                                                <img src={config.url + "/" + item.cover} alt={item.id}/>
                                                <div className="search_info">
                                                    <h3>{item.name}</h3>
                                                    <p>{item.estimation}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                                :
                                <p>Ничего не найдено</p>
                        }

                    </div>
                )
            }

        </div>
    );
};

export default Search;