import { configureStore } from '@reduxjs/toolkit';
import kategoriReducer from '@/redux/action/kategori';
import modalReducer from '@/redux/action/modalDialog';
import bukuReducer from '@/redux/action/buku';

const store = configureStore({
    reducer: {
        kategori: kategoriReducer,
        modal: modalReducer,
        buku: bukuReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true
})

export default store