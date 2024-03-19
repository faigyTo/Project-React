import axios from "axios";

let baseUrl="http://localhost:4000/api/users"

export const addUser=(user)=>{
    return axios.post(`${baseUrl}`,user);
}

export const login=(user)=>{
    return axios.post(`${baseUrl}/login`,user);
}
