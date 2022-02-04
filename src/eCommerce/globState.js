import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  cart: [],
};

const globState = createSlice({
  name: "redux",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.product = payload;
    },

    addToCart: (state, { payload }) => {
      const checkCart = state.cart.findIndex((el) => el.id === payload.id);
      if (checkCart >= 0) {
        state.cart[checkCart].QTY += 1;
      } else {
        const items = { ...payload, QTY: 1 };
        state.cart.push(items);
      }
    },

    remove:(state, {payload}) => {
      const removeCart = state.cart.filter(el => el.id !== payload.id)
      state.cart = removeCart
      
    },
    subTract: (state, {payload})=> {
      const checkCart = state.cart.findIndex((el)=> el.id === payload.id)
      const check = state.cart[checkCart].QTY
      if(check > 1){
        state.cart[checkCart].QTY -= 1
      }else if(check === 1){
        const removeCart = state.cart.filter(el => el.id !== payload.id)
        state.cart = removeCart
      }
    },

    total: (state, {payload}) =>{
      const {totalCost,totalItems} = state.cart.reduce((cost,item)=>{
        const {price,QTY} = item
        const mainCost = price * QTY
        cost.totalItem += QTY
        cost.totalCost += mainCost
        return cost 
      },{
        totalCost: 0,
        totalItems:0,
      })
      state.myTotal = totalCost
      state.myItem = totalItems
    }

  },
});

export const { addProduct, addToCart, remove, subTract, total } = globState.actions;

export default globState.reducer;
