import React, {useEffect, useState} from 'react';
import "./Profile.css"
import {BsPersonFill, BsPencilFill, BsCamera} from "react-icons/bs";
import {useSelector} from "react-redux";
import axios from "axios";
import config from "../../config";
import EditUserData from "../../components/EditUserData/EditUserData";
import {FaUserAlt} from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const {id} = useSelector(state => state.user.currentUser)
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        avatar: "null",
        count_est: "0"
    })
    const [editUserModal, setEditUserModal] = useState(false)
    const [allEst, setAllEst] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const getUserData = async () => {
            await axios.post(config.url + "/profile/get", {id_user: id}).then(response => {
                setUserData(response.data.user)
            })
        }
        const getUserEst = async () => {
            await axios.post(config.url + "/profile/estimation", {id_user: id}).then(response => {
                setAllEst(response.data.films)
            })
        }
        getUserData()
        getUserEst()
    }, [id, editUserModal])

    const avatarUploadHandler = async (img) => {
        try {
            const data = new FormData()
            data.append("avatar", img)
            data.append("id_user", id)
            await axios.post(config.url + "/profile/uploads", data).then(response => {
                setUserData({...userData, avatar: response.data.img})
            })
        }catch (e) {

        }
    }

    const avatarDeleteHandler = async () => {
        try {
            await axios.post(config.url + "/profile/delete", {id_user: id}).then(response => {
                setUserData({...userData, avatar: response.data.img})
            })
        }catch (e) {

        }
    }
    const filmOpenHandler = (e) => {
        navigate(`/film/${e}`)
    }
    return (
        <div className="profile_container">
            <EditUserData activeModal={editUserModal} setActiveModal={setEditUserModal}/>
            <div className="profile_middle">
                <div className="profile_block">
                    <div className="profile_avatar">
                        <div>
                            <div className="profile_label">
                                <h1 onClick={avatarDeleteHandler}>Удалить</h1>
                                <label htmlFor="profile_upload"><h2>Изменить</h2></label>
                            </div>
                            <input type="file" id="profile_upload" onChange={event => avatarUploadHandler(event.target.files[0])} className="profile_input"/>
                            {
                                userData.avatar === "null" ?
                                    <BsPersonFill className="profile_not_avatar"/>
                                    :
                                    <img src={config.url + "/" + userData.avatar} alt="" className="profile_upload_avatar"/>
                            }
                        </div>
                    </div>

                    <div className="profile_info">
                        <h3>{userData.name}</h3>
                        <p>{userData.email}</p>
                        <div className="profile_est">
                            <p>Оценок</p>
                            <b>{userData.count_est}</b>
                        </div>
                    </div>
                    <BsPencilFill className="profile_change_button" onClick={() => setEditUserModal(true)}/>
                </div>
                {
                    allEst.length > 0?
                        <div className="profile_film_est_cont">
                            <h1>Вы оценили</h1>
                            {
                                allEst.map(item => {
                                    return(
                                        <div key={item.id} className="profile_film_est_item" onClick={e => filmOpenHandler(item.id_film)}>
                                            <img src={config.url + "/" + item.cover} alt={item.id}/>
                                            <p>{item.name}</p>
                                            <p>{item.year}</p>
                                            <AiFillStar/>
                                            <p>{item.estimations}</p>
                                            <FaUserAlt/>
                                            <p>{item.countUsers}</p>
                                            <p>Ваша оценка {item.estimation}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                    null
                }


            </div>

        </div>
    );
};

export default Profile;