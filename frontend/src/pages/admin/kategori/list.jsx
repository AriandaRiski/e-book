import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { useSession } from 'next-auth/react'
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';

const list = () => {
    const { data: session } = useSession();
    const [kategori, setKategori] = useState([]);
    const [pending, setPending] = useState(true);

    const fetchData = async (session) => {
        try {

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session}`,
                    'Content-Type': 'application/json'
                },
            };

            const getData = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/kategori/list`, requestOptions);
            const response = await getData.json()

            const timeout = setTimeout(() => {
                setKategori(response.data)
                setPending(false);
            }, 700);
            return () => clearTimeout(timeout);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (session) {
            fetchData(session.tokenAccess)
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
                        <button type='button' className='m-2 btn btn-warning btn-sm' data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                        <button className='m-2 btn btn-danger btn-sm' onClick={() => handleHapus(row.id_kategori)}>Hapus</button>
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

    const formik = useFormik({
        initialValues: {
            kategori: ''
        },

        validationSchema: Yup.object({
            kategori: Yup.string().required()
        }),

        onSubmit: async (values, { resetForm }) => {
            handleSubmit(values, session);
            resetForm();
        }
    })

    const handleSubmit = async (values, session) => {

        try {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.tokenAccess}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            };

            const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/kategori/tambah`, requestOptions);
            const response = await request.json();

            if (!response.status) {
                alert(response.message);
            } else {
                // setKategori(values)

                toast.success(response.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                fetchData(session.tokenAccess)
            }

        } catch (error) {
            console.log(error)
        }
    }

    // DELETE
    const handleHapus = async (id) => {
        try {

            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session.tokenAccess}`,
                    'Content-Type': 'application/json'
                },
            };

            const request = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/kategori/hapus/${id}`, requestOptions);
            const response = await request.json();

            if (!response.success) {

                alert(response.message)

            } else {

                const konfir = confirm("yakin ingin menghapus kategori?");
                if (konfir == true) {
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
                    fetchData(session.tokenAccess)
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
                        data={kategori}
                        actions={action}
                        paginationComponentOptions={paginationComponentOptions}
                        paginationPerPage={10}
                        progressPending={pending}
                        pagination
                    />
                </div>

                {/* Modal Tambah */}
                <div className="modal fade" id="tambahModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Tambah Kategori</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" name="kategori" placeholder="masukkan nama kategori"
                                            {...formik.getFieldProps('kategori')}
                                        />
                                        <label htmlFor="floatingInput">Kategori</label>
                                        {formik.errors.kategori && <div className='error'>{formik.errors.kategori}</div>}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Simpan</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

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