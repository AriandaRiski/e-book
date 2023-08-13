import { useFormik } from 'formik'
import { closeModal } from '@/redux/action/modalDialog'
import { FloatingLabel, Form, Button, Stack } from 'react-bootstrap'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { addBuku, editBuku } from '@/redux/action/buku'
import { getKategori } from '@/redux/action/kategori'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead'

const addForm = (row) => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const { kategori } = useSelector((state) => state);
    const [singleSelections, setSingleSelections] = useState([]);

    useEffect(() => {
        if (session) {
            dispatch(getKategori({ token: session.tokenAccess, page: '1', limit: '*' }));
        }
    }, [session, dispatch]);

    const handleSubmit = async (values) => {

        const value = {
            id_kategori: values.id_kategori,
            judul: values.judul,
            pengarang: values.pengarang,
            penerbit: values.penerbit,
            tahun: values.tahun,
            kota: values.kota,
            cover: {
                name: values.cover.name,
                size: values.cover.size
            }
        }

        try {

            if (row.action) {

                const value = {
                    id: row.data.id,
                    id_kategori: values.id_kategori,
                    judul: values.judul,
                    pengarang: values.pengarang,
                    penerbit: values.penerbit,
                    tahun: values.tahun,
                    kota: values.kota,
                }

                const edit = await dispatch(editBuku({ token: session.tokenAccess, values: value }));
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

                const tambah = await dispatch(addBuku({ token: session.tokenAccess, values: values }));
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
            id_kategori: row.data ? row.data.id_kategori : '',
            judul: row.data ? row.data.judul : '',
            pengarang: row.data ? row.data.pengarang : '',
            penerbit: row.data ? row.data.penerbit : '',
            tahun: row.data ? row.data.tahun : '',
            kota: row.data ? row.data.kota : '',
            cover: ''
        },

        validationSchema: Yup.object({
            id_kategori: Yup.string().required(),
            judul: Yup.string().required(),
            pengarang: Yup.string().required(),
            penerbit: Yup.string().required(),
            kota: Yup.string().required(),
            tahun: Yup.string().required(),
            // cover: Yup.mixed().required()
        }),

        onSubmit: handleSubmit
    })

    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <FloatingLabel controlId="floatingInput" label="Judul Buku" className="mb-3">
                    <Form.Control type="text" placeholder="Judul Buku" name="judul" {...formik.getFieldProps('judul')} />
                    {formik.errors.judul && <div className='error'>{formik.errors.judul}</div>}
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelectGrid" label="Kategori" >
                    <Form.Select aria-label="Kategori" name='id_kategori' className='mb-3' {...formik.getFieldProps('id_kategori')} >
                        <option >Pilih Kategori</option>
                        {kategori.data.map((val, index) =>
                            <option value={val.id_kategori} key={index + 1}>{val.kategori}</option>
                        )}
                    </Form.Select>

                    {/* <Typeahead
                        id="basic-typeahead-single"
                        labelKey="kategori"
                        onChange={setSingleSelections}
                        options={kategori.data}
                        placeholder="Choose a state..."
                        selected={singleSelections}
                    /> */}
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Pengarang" className="mb-3" >
                    <Form.Control type="text" placeholder="Pengarang" name="pengarang" {...formik.getFieldProps('pengarang')} />
                    {formik.errors.pengarang && <div className='error'>{formik.errors.pengarang}</div>}
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Penerbit" className="mb-3">
                    <Form.Control type="text" placeholder="Penerbit" name="penerbit" {...formik.getFieldProps('penerbit')} />
                    {formik.errors.penerbit && <div className='error'>{formik.errors.penerbit}</div>}
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Tahun" className="mb-3">
                    <Form.Control type="text" placeholder="Tahun" name="tahun" {...formik.getFieldProps('tahun')} />
                    {formik.errors.tahun && <div className='error'>{formik.errors.tahun}</div>}
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Kota" className="mb-3">
                    <Form.Control type="text" placeholder="Kota" name="kota" {...formik.getFieldProps('kota')} />
                    {formik.errors.kota && <div className='error'>{formik.errors.kota}</div>}
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Cover" className="mb-3">
                    <Form.Control type="file" name="cover"
                        onChange={(e) => formik.setFieldValue('cover', e.target.files[0])}
                    />
                </FloatingLabel>

                <div className="modal-footer">
                    <Stack direction='horizontal' gap={2}>
                        <Button variant="secondary" type="button" onClick={() => dispatch(closeModal())}>Batal</Button>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Stack>
                </div>
            </Form>

        </>
    )
}

export default addForm