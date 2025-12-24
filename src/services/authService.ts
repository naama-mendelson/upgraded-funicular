import axios from "axios";
import type { AuthFormInputs } from "../types/authData";

export const authService = {
    login:(data: AuthFormInputs) => {
        return axios.post("http://localhost:4000/auth/login", data);
    },
    register:  (data:  AuthFormInputs) => {
        return  axios.post(`http://localhost:4000/auth/register`,{email:data.email,password:data.password,name:data.name});
        
    }
};