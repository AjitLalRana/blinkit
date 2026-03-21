import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        loadCart: (state, action) => {
            state.cart = action.payload;
        }
    }
})

export default cartSlice.reducer;
export const {loadCart} = cartSlice.actions;