import { configureStore } from '@reduxjs/toolkit';
import kategoriReducer from '@/redux/action/kategori'; 
const store = configureStore({
    reducer: {
        kategori : kategoriReducer
    },
    devTools : true
})

export default store