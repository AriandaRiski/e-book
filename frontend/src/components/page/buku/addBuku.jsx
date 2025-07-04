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
// import { Typeahead } from 'react-bootstrap-typeahead'
import Image from 'next/image'

const addForm = (row) => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const { kategori } = useSelector((state) => state);
    const [base64, setBase64] = useState(false);
    const [Lastcover, setLastcover] = useState(row.data?.cover);

    useEffect(() => {
        if (session) {
            dispatch(getKategori({ token: session.tokenAccess, page: '1', limit: '*' }));
        }
    }, [session, dispatch]);

    const handleSubmit = async (values) => {
        values = { ...values, cover: base64 }

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
                    cover: values.cover
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
            // cover : null
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const convert = e.target.result;
                setBase64(convert);
            };
            reader.readAsDataURL(file);
        }
    }

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
                    {formik.errors.id_kategori && <div className='error'>{formik.errors.id_kategori}</div>}
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
                    <Form.Control type="file" name="cover" {...formik.getFieldProps('cover')} onChange={handleFileChange} />
                    {formik.errors.cover && <div className='error'>{formik.errors.cover}</div>}
                    {
                        (base64 || Lastcover) && (
                            <div className="d-flex mt-3">
                                <img src={base64 ? base64 : Lastcover} className="avatars-preview mx-auto d-flex justify-content-center" width={150} height={150} alt="Selected" />
                            </div>
                        )
                    }
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