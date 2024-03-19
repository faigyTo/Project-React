import axios from "axios";

const baseUrl="http://localhost:4000/api/orders";

export const getAllOrders=()=>{
    return axios.get(`${baseUrl}`);
}

export const getOrderByInvitingCode=(_id)=>{
    return axios.get(`${baseUrl}/${_id}`);
}

export const updateOrder=()=>{
    return axios.put(`${baseUrl}`);
}

export const addOrder=(order,token)=>{
    return axios.post(`${baseUrl}`,order,{headers:{
        "x-access-token":token
    }});
}