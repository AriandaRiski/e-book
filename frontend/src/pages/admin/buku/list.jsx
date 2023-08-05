import React from 'react'
import Layout from '@/layout/layout'
import DataBuku from '@/components/page/buku/dataTable'

const list = () => {

    return (
        <>
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">List Buku</h1>
                </div>

                <DataBuku/>

            </Layout>
        </>
    )
}

export default list