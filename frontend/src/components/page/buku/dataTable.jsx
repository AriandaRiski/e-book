import { deleteBuku, getBuku } from '@/redux/action/buku'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Stack } from 'react-bootstrap';
import { openModal } from '@/redux/action/modalDialog';
import { toast } from 'react-toastify';
import AddBuku from '@/components/page/buku/addBuku'
import Image from 'next/image';

const dataTable = () => {

    const dispatch = useDispatch();
    const { buku } = useSelector((state) => state);
    const { data: session } = useSession();
    const [perPage, setPerpage] = useState(10)
    const [current, setCurrent] = useState(1)

    useEffect(() => {
        if (session) {
            dispatch(getBuku({ token: session.tokenAccess, page: current, limit: perPage }));
        }
    }, [session, dispatch]);

    const columns = [
        {
            name: '#',
            selector: (row, index) => ((current * perPage) - perPage) + (index + 1),
            width: '50px'
        },
        {
            name: 'Judul',
            selector: row => row.judul,
            sortable: true,
        },
        {
            name: 'Kategori',
            selector: row => row.kategori,
            sortable: true,
        },
        {
            name: 'Pengarang',
            selector: row => row.pengarang,
            sortable: true,
        },
        {
            name: 'Tahun',
            selector: row => row.tahun,
            sortable: true,
        },
        {
            name: 'Penerbit',
            selector: row => row.penerbit,
            sortable: true,
        },
        {
            name: 'kota',
            selector: row => row.kota,
            sortable: true,
        },
        {
            name: 'cover',
            selector: row => row.cover ?? <Image src="/cover.jpg" width={50} height={50} alt="cover buku" />,
            sortable: true,
        },
        {
            name: 'Aksi',
            cell: (row) => {
                return (
                    <>
                        <Stack direction='horizontal' gap={2}>
                            <Button variant='outline-warning' onClick={() => dispatch(openModal({ title: 'Edit Buku', content: <AddBuku action={'edit'} data={row} /> }))} >Edit</Button>
                            <Button variant='outline-danger' onClick={() => handleHapus(row.id)} >Hapus</Button>
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


    const handlePageChange = page => {
        dispatch(getBuku({ token: session.tokenAccess, page: page, limit: perPage }));
        setCurrent(page)
    };

    const handlePerRowsChange = async (newPerPage, page) => {

        dispatch(getBuku({ token: session.tokenAccess, page: page, limit: newPerPage }));
        setPerpage(newPerPage);
    };

    // DELETE
    const handleHapus = async (id) => {
        try {

            const konfirmasi = confirm("yakin ingin menghapus data Buku?");
            if (konfirmasi == true) {

                const hapus = await dispatch(deleteBuku({ token: session.tokenAccess, id: id }));
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

    const tambah = (<Button variant='outline-primary' onClick={() => dispatch(openModal({ title: 'Tambah Buku', content: <AddBuku />, size: 'xl' }))} >Tambah</Button>)

    return (
        <div>
            <DataTable
                columns={columns}
                data={buku.data}
                actions={tambah}
                paginationComponentOptions={paginationComponentOptions}
                paginationPerPage={perPage}
                progressPending={buku.isLoading}
                pagination
                highlightOnHover
                paginationServer
                paginationTotalRows={buku.total}
                paginationDefaultPage={1}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div >
    )
}

export default dataTable