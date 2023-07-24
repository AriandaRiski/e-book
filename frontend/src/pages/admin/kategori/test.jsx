import React from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/action/modalDialog';
import Form from 'react-bootstrap/Form';
import AddForm from '@/components/page/kategori/addKategori';

// sweet alert
// import Swal from 'sweetalert2';

// const feedBackNotif = (icon, title, message) => {
//     Swal.fire({
//         title: title,
//         text: message,
//         icon: icon,
//         timer: 2000,
//         showConfirmButton: false,
//         allowOutsideClick: true
//     })
// }

// Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
// }).then(async (result) => {
//     if (result.isConfirmed) {
//         const hapus = await dispatch(deleteKategori({ token: session.tokenAccess, id: id }));
//         const response = hapus.payload;
//         if (response.success == false) {
//             return feedBackNotif('error', 'Error!', response.message)
//         } else if (kategori.isDelete == true) {
//             return feedBackNotif('success', 'Berhasil!', 'oke')
//         }
//     }
// })



function FormTextExample() {
    return (
        <>
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
            />
            <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
            </Form.Text>
        </>
    );
}

const test = () => {

    const dispatch = useDispatch();

    return (
        <div>
            <Button variant="primary" onClick={() => { dispatch(openModal({ title: 'modal1', content: "isinya" })) }}>Modal 1</Button>
            <Button variant="success" onClick={() => { dispatch(openModal({ title: 'modal2', content: <FormTextExample /> })) }}>Modal 2</Button>
            <Button variant="info" onClick={() => { dispatch(openModal({ title: 'Modal Test', content: <AddForm /> })) }}>Modal test</Button>
        </div>
    )
}

export default test