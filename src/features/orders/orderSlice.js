import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    busket: [],
    adress: null
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addItem: (state, action) => {
            if (state.busket.length!=0) {
                let ind = state.busket.findIndex(item=>item.product.productName==action.payload.productName);                
                if (ind >= 0) {
                    state.busket[ind].count+=1;
                }
                else {
                    let prodObj = { product: action.payload, count: 1 }
                    state.busket.push(prodObj);
                }
            }
            else {
                let prodObj = { product: action.payload, count: 1 }
                state.busket.push(prodObj);
            }
            localStorage.setItem("busket",JSON.stringify(state.busket));
        },
        decItem:(state,action)=>{
            let ind = state.busket.findIndex(item=>item.product.productName==action.payload.productName);
            state.busket[ind].count-=1;
            localStorage.setItem("busket",JSON.stringify(state.busket));
        },

        removeItem:(state,action)=>{
            let ind = state.busket.findIndex(item=>item.product.productName==action.payload.productName);
            state.busket.splice(ind,1);
        },
        pushToReduce:(state,action)=>{
            state.busket=action.payload;
        },
        setAdress:(state,action)=>{
            state.adress=action.payload;
        },
        delBusket:(state,action)=>{
            state.busket=[];
        }
    }
})

export const { addItem,decItem,removeItem,pushToReduce,setAdress,delBusket } = orderSlice.actions;
export default orderSlice.reducer;