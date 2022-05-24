import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentUser: {
        id: null,
        email: null,
        name: null,
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
            state.currentUser.name = action.payload.currentUser.name;
            state.currentUser.role = action.payload.currentUser.role;
            state.isAuth = true
        },
        removeUser(state){
            state.currentUser.id = null;
            state.currentUser.email = null;
            state.currentUser.name = null;
            state.currentUser.role = null;
            state.isAuth = false;
        }
    }
})

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer