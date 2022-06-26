import { createSlice } from "@reduxjs/toolkit";

export const checkerSlice = createSlice({
    name:'loginckecker',
    initialState:{
        detector:localStorage.getItem('userState')||false
    },
    reducers:{
        loggedin:(state)=>{
            state.detector = localStorage.getItem('userState')
        },
        loggedout:(state)=>{
            state.detector = localStorage.clear()
        }
    }
})

export const {loggedin,loggedout} = checkerSlice.actions;

export default checkerSlice.reducer;