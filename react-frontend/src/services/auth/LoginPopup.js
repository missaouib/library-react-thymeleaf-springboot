import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function LoginPopup() {
    const [ show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show = {show} onHide={handleShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Expired</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please login again!</Modal.Body>
                <Modal.Footer>
                    <Button variant = "danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoginPopup;