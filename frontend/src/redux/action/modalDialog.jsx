import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        title: "",
        content: "",
        size: ""
    },
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true;
            state.title = action.payload.title;
            state.content = action.payload.content;
            state.size = action.payload.size;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.title = "";
            state.content = "";
            state.size = "";
        }
    },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer