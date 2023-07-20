import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { useSession } from 'next-auth/react'
import DataTable from 'react-data-table-component';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addKategori, deleteKategori, getKategori } from '@/redux/action/kategori';
// import Swal from 'sweetalert2';

const list = () => {
    const { data: session } = useSession();

    const dispatch = useDispatch();
    const { kategori } = useSelector((state) => state);

    // sweetAlert
    // const feedBackNotif = (icon, title, message) => {
    //     Swal.fire({
    //         title: title,
    //         text: message,
    //         icon: icon,
    //         timer: 2000,
    //         showConfirmButton: false,
    //         allowOutsideClick: true
    //     })
    // }

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

            const tambah = await dispatch(addKategori({ token: session.tokenAccess, values: values }));
            const response = tambah.payload;

            if (!response.success) {
                alert(response.message)
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

        } catch (error) {
            console.log(error)
        }
    }

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

            // Swal.fire({
            //     title: 'Are you sure?',
            //     text: "You won't be able to revert this!",
            //     icon: 'warning',
            //     showCancelButton: true,
            //     confirmButtonColor: '#3085d6',
            //     cancelButtonColor: '#d33',
            //     confirmButtonText: 'Yes, delete it!'
            // }).then(async (result) => {
            //     if (result.isConfirmed) {
            //         const hapus = await dispatch(deleteKategori({ token: session.tokenAccess, id: id }));
            //         const response = hapus.payload;
            //         if (response.success == false) {
            //             return feedBackNotif('error', 'Error!', response.message)
            //         } else if (kategori.isDelete == true) {
            //             return feedBackNotif('success', 'Berhasil!', 'oke')
            //         }
            //     }
            // })

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