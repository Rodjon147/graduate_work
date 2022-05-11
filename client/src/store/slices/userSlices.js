import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentUser: {
        id: null,
        email: null,
        username: null,
        role: null
    },
    isAuth: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.currentUser.id = action.payload.currentUser.id;
            state.currentUser.email = action.payload.currentUser.email;
            state.currentUser.username = action.payload.currentUser.username;
            state.currentUser.role = action.payload.currentUser.role;
            state.isAuth = true
        },
        removeUser(state){
            state.currentUser.id = null;
            state.currentUser.email = null;
            state.currentUser.username = null;
            state.currentUser.role = null;
            state.isAuth = false;
        }
    }
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer