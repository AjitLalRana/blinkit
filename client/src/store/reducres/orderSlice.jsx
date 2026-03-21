import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    orders: [],
}

const cartSlice = createSlice({
    name: "Order",
    initialState,
    reducers: {
        loadOrders: (state, action) => {
            state.orders = action.payload;
        }
    }
})

export default cartSlice.reducer;
export const {loadOrders} = cartSlice.actions;