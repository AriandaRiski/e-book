import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { useSession } from 'next-auth/react'
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteKategori, getKategori } from '@/redux/action/kategori';
import { Button, Stack } from 'react-bootstrap';
import { openModal } from '@/redux/action/modalDialog';
import FormKategori from '@/components/page/kategori/addKategori';

const list = () => {
    const { data: session } = useSession();

    const dispatch = useDispatch();
    const { kategori } = useSelector((state) => state);

    useEffect(() => {
        if (session) {
            dispatch(getKategori(session.tokenAccess));
        }
    }, [session]);

    const columns = [
        {
            name: '#',
            selector: (row, index) => index + 1,
            width: '50px'
        },
        {
            name: 'Kategori',
            selector: row => row.kategori,
            sortable: true,
        },
        {
            name: 'Aksi',
            cell: (row) => {
                return (
                    <>
                        <Stack direction='horizontal' gap={2}>
                            <Button variant='outline-warning' onClick={() => dispatch(openModal({ title: 'Edit Kategori', content: <FormKategori action={'edit'} data={row} /> }))} >Edit</Button>
                            <Button variant='outline-danger' onClick={() => handleHapus(row.id_kategori)} >Hapus</Button>
                        </Stack>
                    </>
                )
            },
            width: '200px',
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const paginationComponentOptions = {
        rowsPerPageText: 'Jumlah Per Halaman',
        rangeSeparatorText: 'dari',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Semua ',
    };

    const action = (<Button variant="outline-primary" size='lg' onClick={() => { dispatch(openModal({ title: 'Tambah Kategori', content: <FormKategori /> })) }}>Tambah</Button>);

    // DELETE
    const handleHapus = async (id) => {
        try {

            const konfirmasi = confirm("yakin ingin menghapus kategori?");
            if (konfirmasi == true) {

                const hapus = await dispatch(deleteKategori({ token: session.tokenAccess, id: id }));
                const response = hapus.payload;

                if (!response.success) {
                    alert('Kategori Gagal dihapus')
                } else {
                    toast.success(response.message, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }

            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">List Kategori</h1>
                </div>
                <br />
                <div className="table-responsive">
                    <DataTable
                        columns={columns}
                        data={kategori.data}
                        actions={action}
                        paginationComponentOptions={paginationComponentOptions}
                        paginationPerPage={10}
                        progressPending={kategori.isLoading}
                        pagination
                    />
                </div>
            </Layout >
        </>
    )
}

export default list