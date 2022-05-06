import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MainPage from "./pages/MainPage";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setUser} from "./store/slices/userSlices";
import jwtDecode from "jwt-decode"
import Header from "./components/Header/Header";



function App() {
    const dispatch = useDispatch()

    useEffect( () => {
        if (localStorage.getItem('token')) {
            const user = jwtDecode(localStorage.getItem('token'))
            dispatch(setUser({
                currentUser: {
                    id: user.id,
                    email: user.email,
                    username: user.username
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
                  <Route path="*" element={<Navigate to="/main" replace/>}/>
              </Routes>

          </BrowserRouter>

    );
}

export default App;
