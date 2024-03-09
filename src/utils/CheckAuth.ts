import { LoaderFunction, redirect } from "react-router";
import { ToastFunc } from "./ToastFun";

export const getAuthToken = () => {
    const token = localStorage.getItem("token");
    return token;
};

export const tokenLoader = () => {
    return getAuthToken();
};

export const checkAuthentication:LoaderFunction<any> = async () => {
    const token = localStorage.getItem("token");

    if(!token){
        ToastFunc("Please Register",'error');
        return redirect('/signup');
    }
    return null;
}