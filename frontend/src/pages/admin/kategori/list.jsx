import React, { useState, useEffect } from 'react'
import Layout from '@/components/layout/layout'
import { useSession } from 'next-auth/react'

const list = () => {
    const { data: session } = useSession();
    const [kategori, setKategori] = useState(null);

    useEffect(() => {
        if (session) {

            (async () => {
                try {

                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${session.tokenAccess}`,
                            'Content-Type': 'application/json'
                        },
                    };

                    const getData = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/kategori/list`, requestOptions);
                    const response = await getData.json()

                    setKategori(response.data)

                } catch (error) {
                    console.log(error)
                }

            })();
        }
    }, [session])

    return (
        <>
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">List Kategori</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">halo, {session?.user.name}</div>
                </div>
                <div className="table-responsive">
                    <div className=''>
                        <button type="button" className="btn-sm btn btn-primary">Tambah</button>
                    </div>

                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th className="text-center" width="5%" scope="col">No</th>
                                <th scope="col">Nama Kategori</th>
                                <th className="text-center" width="20%" scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                kategori && kategori.map((data, index) =>
                                    <tr>
                                        <td className="text-center">{index + 1}</td>
                                        <td>{data.kategori}</td>
                                        <td>
                                            <div className="text-center">
                                                <button type="button" className="m-2 btn-sm btn btn-warning">Edit</button>
                                                <button type="button" className="m-2 btn-sm btn btn-danger">Hapus</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </Layout >
        </>
    )
}

export default list