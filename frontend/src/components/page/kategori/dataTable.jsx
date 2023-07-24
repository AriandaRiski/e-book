import { getKategori, deleteKategori } from '@/redux/action/kategori'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Stack } from 'react-bootstrap';
import { openModal } from '@/redux/action/modalDialog';
import FormKategori from '@/components/page/kategori/addKategori';
import { toast } from 'react-toastify';

const dataTable = () => {

    const dispatch = useDispatch();
    const { kategori } = useSelector((state) => state);
    const { data: session } = useSession();
    const [perPage, setPerpage] = useState(10)
    const [current, setCurrent] = useState(1)

    useEffect(() => {
        if (session) {
            dispatch(getKategori({ token: session.tokenAccess, page: current, limit: perPage }));
        }
    }, [session, dispatch]);

    const columns = [
        {
            name: '#',
            selector: (row, index) => ((current * perPage) - perPage) + (index + 1),
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

    const handlePageChange = page => {
        dispatch(getKategori({ token: session.tokenAccess, page: page, limit: perPage }));
        setCurrent(page)
    };

    const handlePerRowsChange = async (newPerPage, page) => {

        dispatch(getKategori({ token: session.tokenAccess, page: page, limit: newPerPage }));
        setPerpage(newPerPage);
    };

    return (
        <div>
            <DataTable
                title="pisah datatable"
                columns={columns}
                data={kategori.data}
                actions={action}
                paginationComponentOptions={paginationComponentOptions}
                paginationPerPage={perPage}
                progressPending={kategori.isLoading}
                pagination
                highlightOnHover
                paginationServer
                paginationTotalRows={kategori.total}
                paginationDefaultPage={1}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div >
    )
}

export default dataTable