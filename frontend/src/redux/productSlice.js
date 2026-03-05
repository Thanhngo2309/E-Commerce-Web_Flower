import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        cart: [],
        addresses:[],
        selectedAddress: null // currently chosen address
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setCart: (state, action) => {
            state.cart = action.payload
        },
        addAddress:(state,action) =>{
            if(!state.addresses) state.addresses = []
            state.addresses.push(action.payload)
        },
        setSelectAddress:(state,action)=>{
            state.selectedAddress = action.payload
        },
        deleteAddress:(state,action)=>{
            state.addresses = state.addresses.filter((_,index)=> index !== action.payload)
            if(state.selectedAddress === action.payload){
                state.selectedAddress = null
            }
        }
    },
})

export const { setProducts, setCart,addAddress,setSelectAddress,deleteAddress } = productSlice.actions
export default productSlice.reducer