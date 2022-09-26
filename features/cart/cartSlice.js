import { createSlice } from "@reduxjs/toolkit";
let totalAmount;
let totalQuantity;
let items;

if (typeof window !== "undefined") {
  // Perform localStorage action
  // const item = localStorage.getItem('key')
  totalAmount =
    localStorage.getItem("totalAmount") !== null
      ? JSON.parse(localStorage.getItem("totalAmount"))
      : [];
  totalQuantity =
    localStorage.getItem("totalQuantity") !== null
      ? JSON.parse(localStorage.getItem("totalQuantity"))
      : [];
  items = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
}
const setItemFunc = (itemsList, totalQuantity, totalAmount) => {
  localStorage.setItem("cartItems", JSON.stringify(itemsList));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemList: items,
    totalQuantity: totalQuantity,
    totalAmount: totalAmount,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.itemList.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemList.push({
          ...newItem,
          quantity: 1,
        });
        state.totalQuantity++;
      }
      setItemFunc(state.itemList, state.totalQuantity, state.totalAmount);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.itemList.find((item) => item.id === id);
      if (existingItem.quantity == 1) {
        state.itemList = state.itemList.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      setItemFunc(state.itemList, state.totalQuantity, state.totalAmount);
    },
    clearCart(state) {
      state.itemList = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});
export const selectCart = (state) => state.cart.itemList;
export const totalQuantityCart = (state) => state.cart.totalQuantity;
export const totalCartAmount = (state) => state.cart.totalAmount;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
