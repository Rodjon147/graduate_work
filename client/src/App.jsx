import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "./store/slices/userSlices";
import jwtDecode from "jwt-decode"
import Header from "./components/Header/Header";
import NotFoundPage from "./pages/NotFoundPage";
import ControlSite from "./pages/ControlSite";

function App() {
    const dispatch = useDispatch()

    useEffect( () => {
        if (localStorage.getItem('token')) {
            const user = jwtDecode(localStorage.getItem('token'))
            dispatch(setUser({
                currentUser: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role
                }

            }))
            console.log(user.username)
        }
    }, [dispatch])

    return (
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path="/main" element={<MainPage/>}/>
                  <Route path="/control" element={<ControlSite/>}/>
                  <Route path="*" element={<NotFoundPage/>}/>
              </Routes>
          </BrowserRouter>
    );
}

export default App;
