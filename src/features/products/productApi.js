import axios from "axios";

let baseUrl="http://localhost:4000/api/products";

export const getAllProducts=(page,perPage,searchProductName, searchCategury)=>{
   return axios.get(`${baseUrl}?page=${page}&perPage=${perPage}&searchProductName=${searchProductName}&searchCategury=${searchCategury}`);
}

export const getProductById=(id)=>{
    return axios.get(`${baseUrl}/${id}`);
}

export const getCountProduct=()=>{
    return axios.get(`${baseUrl}/count`);
}

export const getCountProductByCategury=(categury)=>{
    return axios.get(`${baseUrl}/countCategury?categury=${categury}`);
}

export const addProducts=(product,token)=>{
    return axios.post(`${baseUrl}`,product,{
        headers:{
            "x-access-token":token,
        }
    });
}

export const updateProduct=(product,id,token)=>{
    return axios.put(`${baseUrl}/${id}`,product,{
        headers:{
            "x-access-token":token
        }});
}

export const deleteProduct=(id,token)=>{
    return axios.delete(`${baseUrl}/${id}`,{
        headers:{
            "x-access-token":token
        }});
}

export const getProductByCategury=(categury)=>{
    return axios.get(`${baseUrl}/byCategury?categury=${categury}`);
}