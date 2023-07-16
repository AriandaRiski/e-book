import React from 'react';
import { useFormik } from 'formik';
import Router, { useRouter } from 'next/router';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

const handleSubmit = async (values) => {

  try {

    const login = await signIn('credentials', {
      redirect: false,
      username: values.username,
      pass: values.pass
    })

    if (!login.ok) {

      toast.error('Username atau Password salah', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    } else {
      return Router.push('/admin/dashboard')
    }

  } catch (error) {
    console.log(error)
  }
}

const FormLogin = () => {

  useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      pass: ''
    },

    validationSchema: Yup.object({
      username: Yup.string().required(),
      pass: Yup.string().required(),
    }),

    onSubmit: async (values) => {
      handleSubmit(values)
    }
  })

  return (
    <>
      <main className="form-signin">
        <br />
        <form onSubmit={formik.handleSubmit}>
          {/* <img className="mb-4" src="/assets/img/bootstrap-logo.svg" width={72} height={57} /> */}
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input type="username" className="form-control" name="username" placeholder="username"
              {...formik.getFieldProps('username')} />
            <label htmlFor="floatingInput">Username</label>
            {formik.errors.username && <div className='error'>{formik.errors.username}</div>}
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" name="pass" placeholder="Password"
              {...formik.getFieldProps('pass')} />
            <label htmlFor="floatingPassword">Password</label>
            {formik.errors.pass && <div className='error'>{formik.errors.pass}</div>}
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" defaultValue="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type='submit'>Sign in</button>
          <p className="mt-5 mb-3 text-muted">© 2023</p>
        </form>
      </main>
    </>
  )
}

export default FormLogin