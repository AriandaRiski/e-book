import Layout from '@/components/layout/layout'
import DataKategori from '@/components/page/kategori/dataTable';

const list = () => {
    return (
        <>
            <Layout>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">List Kategori</h1>
                </div>
                <br />
                <div className="table-responsive">
                    <DataKategori />
                </div>
            </Layout >
        </>
    )
}

export default list