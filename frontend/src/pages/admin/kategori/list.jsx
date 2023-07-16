import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { useSession } from 'next-auth/react'
import DataTable from 'react-data-table-component';
import AddKategori from '@/pages/admin/addKategori';

const list = () => {
    const { data: session } = useSession();
    const [kategori, setKategori] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        if (session) {

            (async () => {
                try {

                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${session.tokenAccess}`,
                            'Content-Type': 'application/json'
                        },
                    };

                    const getData = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/kategori/list`, requestOptions);
                    const response = await getData.json();

                    const timeout = setTimeout(() => {
                        setKategori(response.data)
                        setPending(false);
                    }, 700);
                    return () => clearTimeout(timeout);

                } catch (error) {
                    console.log(error)
                }

            })();
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
            cell: () => {
                return (
                    <>
                        <button type='button' className='m-2 btn btn-warning btn-sm' data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                        <button className='m-2 btn btn-danger btn-sm'>Hapus</button>
                    </>
                )
            },
            width: '140px',
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

    const action = (<button className='btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target="#tambahModal">Tambah</button>);

    return (
        <>
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">List Kategori</h1>
                </div>
                <br/>
                <div className="table-responsive">
                    <DataTable
                        columns={columns}
                        data={kategori}
                        actions={action}
                        paginationComponentOptions={paginationComponentOptions}
                        paginationPerPage={10}
                        progressPending={pending}
                        pagination
                    />
                </div>

                <AddKategori/>

                {/* Modal Edit */}
                <div>
                    <div className="modal fade" id="editModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Kategori</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    ...
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Simpan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout >
        </>
    )
}

export default list