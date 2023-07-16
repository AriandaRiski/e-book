import React from 'react'
import Layout from '@/components/layout/layout'
import { useSession } from 'next-auth/react'

const index = () => {

  const {data : session} = useSession();

  return (
    <>
        <Layout>
            <br/>
            <h2>Home</h2>
            <hr/>
            <p>{session?.email}</p>

        </Layout>
    </>
  )
}

export default index