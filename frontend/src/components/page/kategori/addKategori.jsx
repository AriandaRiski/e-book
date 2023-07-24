import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { addKategori, editKategori } from '@/redux/action/kategori';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/action/modalDialog';
import { toast } from 'react-toastify';

const addForm = (row) => {

    const { data: session } = useSession()
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {

        try {

            if (row.action) {

                const value = {
                    id_kategori: row.data.id_kategori,
                    kategori: values.kategori,
                }

                const edit = await dispatch(editKategori({ token: session.tokenAccess, values: value }));
                const response = edit.payload;

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

            } else {

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
            }

            dispatch(closeModal())

        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            kategori: row.data ? row.data.kategori : ''
        },

        validationSchema: Yup.object({
            kategori: Yup.string().required()
        }),

        // onSubmit: row.action ? handleEdit : handleSubmit
        onSubmit: handleSubmit

    })

    return (
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
                <button type="button" className="btn btn-secondary" onClick={() => dispatch(closeModal())}>Close</button>
                <button type="submit" className="btn btn-primary">Simpan</button>
            </div>
        </form>
    );
};

export default addForm;