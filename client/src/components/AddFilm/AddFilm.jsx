import React,{useState, useCallback, useRef} from 'react';
import Modal from "../Modal/Modal";
import axios from "axios";
import "./AddFilm.css"
import config from "../../config";

const AddFilm = ({modalActive, setActive}) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        genre: '',
        director: '',
        year: '',
        country: ''
    })
    const [error, setError] = useState({
        name: '',
        description: '',
        genre: '',
        director: '',
        year: '',
        country: ''
    })
    const [img, setImg] = useState(null)
    const fileInput = useRef()
    const addFilmHandler = useCallback(async (e) => {
        try{
            e.preventDefault()
            const data = new FormData()
            data.append('cover', img)
            data.append('name', form.name)
            data.append('description', form.description)
            data.append('genre', form.genre)
            data.append('director', form.director)
            data.append('year', form.year)
            data.append('country', form.country)

            await axios.post(config.url +"/manager/film/upload", data, {
                header: {
                    'content-type': 'multipart/form-data'
                }
            }).then(() => {
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
                setActive(false)
            })

        }catch (e){

        }
    }, [form, img, setActive])

    return (
        <div>
            <Modal active={modalActive} setActive={setActive}>
                <form className="adduser_form">
                    <h1>Новый фильм</h1>
                    <input type="text" placeholder="Введите название" value={form.name} onChange={event => {
                        setForm({...form, name: event.target.value})

                    }}/>
                    <p className="error_form_text">{error.name}</p>
                    <textarea placeholder="Введите описание" value={form.description} onChange={event => {
                        setForm({...form, description: event.target.value})

                    }}></textarea>
                    <p className="error_form_text">{error.description}</p>
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
                    <input type="text" placeholder="Введите имя режиссёра" value={form.director} onChange={event => {
                        setForm({...form, director: event.target.value})

                    }}/>
                    <p className="error_form_text">{error.director}</p>
                    <input type="text" placeholder="Введите год премьеры" value={form.year} onChange={event => setForm({...form, year: event.target.value})}/>
                    <p className="error_form_text">{error.year}</p>
                    <input type="text" placeholder="Введите страну" value={form.country} onChange={event => setForm({...form, country: event.target.value})}/>
                    <p className="error_form_text">{error.country}</p>
                    <input type="file" ref={fileInput} onChange={event => setImg(event.target.files[0])}/>
                    <button onClick={addFilmHandler}>Добавить</button>
                </form>
            </Modal>
        </div>
    );
};

export default AddFilm;