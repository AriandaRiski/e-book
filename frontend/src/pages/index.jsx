import React from 'react'
import Layout from '@/components/layout/layout'
import { useSession } from 'next-auth/react'

const index = () => {

  const {data : sesion} = useSession();
  console.log(sesion)

  return (
    <>
        <Layout email={sesion?.email}>
            <br/>
            <h2>Home</h2>
            <hr/>
            <p>{sesion?.email}</p>

        </Layout>
    </>
  )
}

export default index