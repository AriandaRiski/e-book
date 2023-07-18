import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getKategori = createAsyncThunk('kategori/getKategori', async (token) => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/kategori/list`, requestOptions);
        const data = await response.json();

        return data
    } catch (error) {
        console.log(error)
    }
});

export const deleteKategori = createAsyncThunk('kategori/deleteKategori', async ({ token, id }) => {
    try {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/kategori/hapus/${id}`, requestOptions);
        const data = await response.json();

        return data;

    } catch (error) {
        console.log(error)
    }
})

const kategoriSlice = createSlice({
    name: 'kategori',
    initialState: {
        isLoading: false,
        isError: null,
        data: [],
        isDelete: false
    },

    extraReducers: (builder) => {
        builder
            .addCase(getKategori.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getKategori.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data;
            })
            .addCase(getKategori.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.error;
            })

            // delete
            .addCase(deleteKategori.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteKategori.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.data = state.data.filter((data) => data.id_kategori != action.payload.id_kategori );
                state.isDelete = action.payload.success;
            })
            .addCase(deleteKategori.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.error;
            })
    }
})

export default kategoriSlice.reducer