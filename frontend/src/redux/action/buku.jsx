import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const getBuku = createAsyncThunk('buku/getBuku', async ({ token, page, limit }) => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/buku/list?page=${page}&limit=${limit}`, requestOptions);
        const data = await response.json();

        return data
    } catch (error) {
        console.log(error)
    }
});

export const deleteBuku = createAsyncThunk('buku/deleteBuku', async ({ token, id }) => {
    try {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/buku/hapus/${id}`, requestOptions);
        const data = await response.json();

        return data;

    } catch (error) {
        console.log(error)
    }
})

export const addBuku = createAsyncThunk('buku/addBuku', async ({ token, values }) => {
    try {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(values),
        };

        const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/buku/tambah`, requestOptions);
        const response = await request.json();

        return response

    } catch (error) {
        console.log(error)
    }
})

export const editBuku = createAsyncThunk('buku/editBuku', async ({ token, values }) => {
    try {

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(values),
        };

        const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/buku/edit/${values.id}`, requestOptions);
        const response = await request.json();

        return response

    } catch (error) {
        console.log(error)
    }
})


const bukuSlice = createSlice({
    name: 'buku',
    initialState: {
        isLoading: false,
        isError: null,
        data: [],
        total: 0
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBuku.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getBuku.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data;
                state.total = action.payload.total;
            })
            .addCase(getBuku.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.error;
            })
            // delete
            .addCase(deleteBuku.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = state.data.filter((buku) => buku.id !== action.meta.arg.id);
                state.total = state.total - 1;
            })
            // add
            .addCase(addBuku.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(addBuku.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.data = action.payload.data ? [...state.data, action.payload.data] : state.data;
                state.data = action.payload.data ? [...state.data, action.payload.data].slice(0).sort((a,b) => b.id - a.id) : state.data;
                state.total = state.total + 1;
            })
            .addCase(addBuku.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.error;
            })
            // edit
            .addCase(editBuku.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload.data ? state.data.map(obj => obj.id == action.payload.data.id ? { ...obj, ...action.payload.data } : obj) : state.data
            })
    }
})

export default bukuSlice.reducer
