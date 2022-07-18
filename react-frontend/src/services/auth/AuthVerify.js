
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';
import { Button, Modal } from "react-bootstrap";
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}
const AuthVerify = () => {
  const [ show, setShow] = useState(false);
  const navigate = useNavigate();
  const [logged, setIsLogged] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"))

  const logout = () => {
    AuthService.logout();
    navigate('/login')
    setIsLogged(false)
  }
  const handleClose = () => {
    setShow(false);
    logout();
  }
  const handleShow = () => setShow(true);
  
  useEffect(() => {
    const token = user?.accessToken
    if (token) {
      const decodedJwt = parseJwt(user.accessToken);
      if (decodedJwt.exp * 1000 < Date.now()) {
        handleShow();
      }
      setIsLogged(false)
    }
  })
  return (
    <>
        <Modal show = {show} onHide={handleClose}>
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

export default AuthVerify