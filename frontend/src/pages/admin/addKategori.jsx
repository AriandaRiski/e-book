// add kategori yg pertama belajar

import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify';

const addKategori = () => {

  const { data: session } = useSession();
  const [tambah, setTambah] = useState('');

  const formik = useFormik({
    initialValues: {
      kategori: ''
    },

    validationSchema: Yup.object({
      kategori: Yup.string().required()
    }),

    onSubmit: async (values) => {
      handleSubmit(values, session)
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
      }
      // else {
      //   toast.success(response.message, {
      //     position: "top-center",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "colored",
      //   });
      // }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
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
                <button type="submit" className="btn btn-primary">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default addKategori