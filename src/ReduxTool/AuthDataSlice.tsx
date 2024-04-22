import { createSlice } from "@reduxjs/toolkit";

type userDataType ={
    name:string,
    password:string,
}

type authSliceType ={
    isAuthenticated:boolean,
    user:userDataType,
    token:string | null,
}
const initialState:authSliceType = {
    user:{
        name:"",
        password:""
    },
    isAuthenticated: false,
    token: null,
}
const AuthDataSlice = createSlice({
    name: "AuthData",
    initialState: initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            const {userData,token}= action.payload;
            state.isAuthenticated = true;
            state.user = userData;
            state.token = token;

            localStorage.setItem("token",token)
            
            // const serializedUserData = JSON.stringify({
            //     email:userData.email,
            //     password: userData.password
            // });
            // localStorage.setItem("data", serializedUserData);
        },
        logOut: (state) => {
            localStorage.removeItem("token");
            localStorage.clear();
            state.isAuthenticated = false;
            state.token = null;
        }
    }
})

export const { setIsAuthenticated,logOut } = AuthDataSlice.actions
export default AuthDataSlice.reducer;