import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "./store/slices/userSlices";
import jwtDecode from "jwt-decode"
import Header from "./components/Header/Header";
import NotFoundPage from "./pages/NotFoundPage";
import Management from "./pages/Settings/Management";
import Film from "./Film/Film";

function App() {
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)

    useEffect( () => {
        if (localStorage.getItem('token')) {
            const user = jwtDecode(localStorage.getItem('token'))
            dispatch(setUser({
                currentUser: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }

            }))
        }
    }, [dispatch])

    return (
          <BrowserRouter>
              <Header/>
              {
                  currentUser.role === 'user' ?
                      <Routes>
                          <Route path="/main" element={<MainPage/>}/>
                          <Route path="/manager" element={<Management/>}/>
                          <Route path="/film/:id_film" element={<Film/>}/>
                          <Route path="*" element={<NotFoundPage/>}/>
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
