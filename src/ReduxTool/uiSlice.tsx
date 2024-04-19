import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showUserEdit:true,
    showProfileBox:false
}
const UISlice = createSlice({
    name:'UI',
    initialState,
    reducers:{
        setShowUserEdit:(state)=>{
            state.showUserEdit = true
        },
        setHideUserEdit:(state)=>{
            state.showUserEdit = false
        },
        setShowProfileBox:(state)=>{
            state.showProfileBox = true
        },
        setHideProfileBox:(state)=>{
            state.showProfileBox = false
        },

    }
})

export const {setHideUserEdit,setShowUserEdit,setShowProfileBox,setHideProfileBox} = UISlice.actions
export default UISlice.reducer