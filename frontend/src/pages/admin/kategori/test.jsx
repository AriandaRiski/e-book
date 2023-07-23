import React from 'react'
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/action/modalDialog';
import Form from 'react-bootstrap/Form';


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
            <Button variant="primary" onClick={() => { dispatch(openModal({ title: 'modal2', content: <FormTextExample /> })) }}>Modal 2</Button>
        </div>
    )
}

export default test