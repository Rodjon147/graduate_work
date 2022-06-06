import React, {useState, useEffect} from 'react';
import "./UserControl.css"
import {BsFillPersonFill, BsFillTrashFill} from "react-icons/bs";
import axios from "axios";
import "./UserControl.css"
import config from "../../config";

const UserControl = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get(config.url + "/manager/user").then(response => {
            setUsers(response.data.users)
        })
    }, [])

    const userDeleteHandler = async (event) => {
        function deleteUserAccount(){
            return axios.post(config.url + "/manager/user/delete", {id_user: event})
        }
        function getUserAccount(){
            return axios.get(config.url + "/manager/user").then(response => {
                setUsers(response.data.users)
            })
        }
        await axios.all([deleteUserAccount(), getUserAccount()])
    }

    return (
        <div>
            <h1>Пользователи</h1>

            <div>
                <table border="1" width="100%" cellPadding="5" className="userControl_table">
                    <thead>
                    <tr>
                        <th>Аватар</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th></th>
                    </tr>
                    {
                        users.map(
                            user => {
                                return (
                                    <tr key={user.id}>
                                        <td>
                                            {
                                                user.avatar !== "null" ?
                                                    <img src={config.url +"/" + user.avatar} alt={user.id} className="userControl_img"/>
                                                    :
                                                    <BsFillPersonFill className="userControl_noImg"/>
                                            }

                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <BsFillTrashFill className="userControl_button_delete" onClick={event => userDeleteHandler(user.id)}/>
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

export default UserControl;