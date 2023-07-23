import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/redux/action/modalDialog';

function modalDialog() {

  const dispatch = useDispatch();
  const  modal  = useSelector((state) => state.modal);

  return (
    <>
      <Modal
        show={modal.isOpen}
        onHide={() => { dispatch(closeModal()) }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modal.content}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default modalDialog;