import { configureStore } from '@reduxjs/toolkit';
import kategoriReducer from '@/redux/action/kategori'; 
import modalReducer from '@/redux/action/modalDialog';

const store = configureStore({
    reducer: {
        kategori : kategoriReducer,
        modal : modalReducer
    },
    devTools : true
})

export default store