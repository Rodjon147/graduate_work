import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "./store/slices/userSlices";
import jwtDecode from "jwt-decode"
import Header from "./components/Header/Header";
import NotFoundPage from "./pages/NotFoundPage";
import Management from "./pages/Settings/Management";
import Film from "./pages/Film/Film";
import Profile from "./pages/profile/Profile";
import axios from "axios";
import config from "./config";

function App() {
    const dispatch = useDispatch()
    const {currentUser, isAuth} = useSelector(state => state.user)

    useEffect( () => {
        if (localStorage.getItem('token')) {
            const getUser = async () => {
                try {
                    const user = jwtDecode(localStorage.getItem('token'))
                    await axios.post(config.url + "/user", {id_user: user.id}).then(response => {
                        dispatch(setUser({
                            currentUser: {
                                id: response.data.user.id,
                                email: response.data.user.email,
                                name: response.data.user.name,
                                role: response.data.user.role
                            }

                        }))
                    })
                }catch (e) {

                }
            }
            getUser()
        }

    }, [dispatch])

    return (
          <BrowserRouter>
              <Header/>
              {
                  isAuth ?
                          currentUser.role === 'admin' ?
                              <Routes>
                                  <Route path="/main" element={<MainPage/>}/>
                                  <Route path="/manager" element={<Management/>}/>
                                  <Route path="/profile" element={<Profile/>}/>
                                  <Route path="/film/:id_film" element={<Film/>}/>
                                  <Route path="*" element={<NotFoundPage/>}/>
                              </Routes>
                              :
                              <Routes>
                                  <Route path="/main" element={<MainPage/>}/>
                                  <Route path="/film/:id_film" element={<Film/>}/>
                                  <Route path="/profile" element={<Profile/>}/>
                                  <Route path="*" element={<Navigate to="/main" replace/>}/>
                              </Routes>
                      :
                      <Routes>
                          <Route path="/main" element={<MainPage/>}/>
                          <Route path="/film/:id_film" element={<Film/>}/>
                          <Route path="*" element={<Navigate to="/main" replace/>}/>
                      </Routes>
              }


          </BrowserRouter>
    );
}

export default App;
