import React from 'react'

const Kategori = (getKategori) => {
    console.log(getKategori)
    return (
        <>
            <div>Kategori</div>
        </>
    )
}

export default Kategori

export async function getServerSideProps() {

    const kategori = await fetch('http://localhost:3003/kategori/list');
    const getKategori = await kategori.json();

    return {
        props: {
            kategori: getKategori
        }
    }
}