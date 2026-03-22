import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../store/reducres/userSlice'
import cartSlice from '../store/reducres/cartSlice'
import orderSlice from '../store/reducres/orderSlice'
import productSlice from '../store/reducres/productSlice'


export const store = configureStore({
    reducer: {
        userReducer : userSlice,
        cartReducer : cartSlice,
        orderReducer : orderSlice,
        productReducer : productSlice,
    },
})