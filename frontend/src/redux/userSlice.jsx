import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        theme:"dark",
        userData: JSON.parse(localStorage.getItem('user')) || null
    },
    reducers:{
        userTheme: (state,action) => {
            state.theme = action.payload
        },
        addUser:(state,action) => {
            state.userData = action.payload
        }
    }
})

export const {userTheme,addUser} = userSlice.actions

export default userSlice.reducer