import React, {useState, useEffect, useRef, useCallback} from 'react';
import Modal from "../Modal/Modal";
import axios from "axios";
import "./EditFilm.css"
import { BsArrowCounterclockwise } from "react-icons/bs";
import config from "../../config";

const EditFilm = ({idFilm, setFilm, modalActive, setActive}) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        genre: '',
        director: '',
        year: '',
        country: ''
    })
    const [img, setImg] = useState(null)
    const [cover, setCover] = useState(null)
    const [selectImg, setSelectImg] = useState(null)
    const [idCurrentFilm, setIdCurrentFilm] = useState(null)
    const fileInput = useRef()

    useEffect(() => {
        setIdCurrentFilm(idFilm)
        const filmHandler = async () => {
            await axios.post(config.url + "/manager/film/current", {id_film: idFilm}).then(response => {
                if(response.data.films){
                    setForm({
                        name: response.data.films.name,
                        description: response.data.films.description,
                        genre: response.data.films.genre,
                        director: response.data.films.director,
                        year: response.data.films.year,
                        country: response.data.films.country
                    })
                    setCover(response.data.films.cover)
                }

            })
        }
        filmHandler()
    }, [idFilm])

    useEffect(() => {
        if(!modalActive){
            setForm({
                name: '',
                description: '',
                genre: '',
                director: '',
                year: '',
                country: ''
            })
            fileInput.current.value = ""
            setImg(null)
            setCover(null)
            setFilm(1)
            setSelectImg(null)
        }

    }, [modalActive, setFilm])

    const changeFilmHandler = useCallback(async (e) => {
        try{
            e.preventDefault()
            const data = new FormData()
            data.append('cover', img)
            data.append('id_film', idCurrentFilm)

            await axios.post(config.url + "/manager/film/change-text", {...form, id_film: idCurrentFilm}, {
                header: {
                    'content-type': 'multipart/form-data'
                }
            }).then(() => {
                if(img){
                    axios.post(config.url + "/manager/film/change-img", data, {
                        header: {
                            'content-type': 'multipart/form-data'
                        }
                    })
                }
                setForm({
                    name: '',
                    description: '',
                    genre: '',
                    director: '',
                    year: '',
                    country: ''
                })
                fileInput.current.value = ""
                setImg(null)
                setCover(null)
                setSelectImg(null)
                setFilm(1)
                setActive(false)
            })

        }catch (e){

        }
    }, [form, img, setActive, setFilm, idCurrentFilm])

    return (
        <div>
            <Modal active={modalActive} setActive={setActive}>
                <form className="editFilm_form">
                    <h1>Изменить фильм</h1>
                    <input type="text" placeholder="Введите название" value={form.name} onChange={event => setForm({...form, name: event.target.value})}/>
                    <textarea placeholder="Введите описание" value={form.description} onChange={event => setForm({...form, description: event.target.value})}></textarea>
                    <select value={form.genre} onChange={event => setForm({...form, genre: event.target.value})}>
                        <option value="" hidden>Выберите жанр</option>
                        <option value="Боевик">Боевик</option>
                        <option value="Вестрен">Вестрен</option>
                        <option value="Гангстерский фильм">Гангстерский фильм</option>
                        <option value="Детектив">Детектив</option>
                        <option value="Исторический фильм">Исторический фильм</option>
                        <option value="Комедия">Комедия</option>
                        <option value="Мелодрама">Мелодрама</option>
                        <option value="Музыкальный фильм">Музыкальный фильм</option>
                        <option value="Нуар">Нуар</option>
                        <option value="Политический фильм">Политический фильм</option>
                        <option value="Приключенческий фильм">Приключенческий фильм</option>
                        <option value="Сказка">Сказка</option>
                        <option value="Трагедия">Трагедия</option>
                        <option value="Трагикомедия">Трагикомедия</option>
                        <option value="Триллер">Триллер</option>
                        <option value="Фантастический фильм">Фантастический фильм</option>
                        <option value="Фильм ужасов">Фильм ужасов</option>
                        <option value="Фильм-катастрофа">Фильм-катастрофа</option>
                    </select>
                    <input type="text" placeholder="Введите имя режиссёра" value={form.director} onChange={event => setForm({...form, director: event.target.value})}/>
                    <input type="text" placeholder="Введите год премьеры" value={form.year} onChange={event => setForm({...form, year: event.target.value})}/>
                    <input type="text" placeholder="Введите страну" value={form.country} onChange={event => setForm({...form, country: event.target.value})}/>
                    <div className="editFilm_cover">
                        {
                            img ?
                                <img src={selectImg} alt={img} className="editFilm_img"/>
                                :
                                cover &&
                                <img src={config.url + "/" + cover} alt={cover? cover : ""} className="editFilm_img"/>
                        }

                        <label htmlFor="firstimg">
                            <p>{cover? cover.split("public\\images\\") : null}</p>
                            <b>Обновить</b>
                        </label>

                        <input id="firstimg" type="file" ref={fileInput} onChange={event => {
                            setImg(event.target.files[0])
                            setSelectImg(URL.createObjectURL(event.target.files[0]))
                        }}/>
                    </div>

                    <button onClick={changeFilmHandler}>Изменить</button>
                </form>
            </Modal>
        </div>
    );
};

export default EditFilm;