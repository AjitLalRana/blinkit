import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allProducts: [], // renamed for clarity
    isLoading: true,
    error: null
};

const productSlice = createSlice({
    name: "Products",
    initialState,
    reducers: {
        // Call this when your API request starts
        setLoading: (state) => {
            state.isLoading = true;
        },
        // Call this when data arrives successfully
        loadProducts: (state, action) => {
            state.allProducts = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        // Call this if the API fails
        setProductError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        
    }
});

// Export the reducer for the store
export default productSlice.reducer;

// Export actions for use in dispatch
export const { loadProducts, setLoading, setProductError } = productSlice.actions;

// Selectors for easy access in components
export const selectAllProducts = (state) => state?.productReducer?.allProducts;
export const selectIsProductLoading = (state) => state?.productReducer?.isLoading;