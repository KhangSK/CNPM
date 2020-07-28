import React, { useState, useContext, useEffect } from 'react'
import { Navbar, Button, Modal, InputGroup, FormControl } from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'

import setAuthToken from '../../utils/setAuthToken'
import clearToken from '../../utils/clearToken'

import { GlobalContext } from '../../context/GlobalContext'

export default function Header() {
  const { login, register, logout, isAuthenticated, setCurrentUser, setCurrentBill, getStalls, getProducts, user } = useContext(GlobalContext)

  const [show, setShow] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const loginUser = () => {
    login({ email, password })

    setShow(false)
    setEmail('')
    setPassword('')
  }

  const registerUser = () => {
    register({ name, email, password, password2 })

    setShow(false)
    setName('')
    setEmail('')
    setPassword('')
    setPassword2('')
  }

  const handleLoginClick = () => {
    if (!isLogin)
      setIsLogin(true)
    handleShow()
  }

  const handleRegisterClick = () => {
    if (isLogin)
      setIsLogin(false)
    handleShow()
  }

  const checkToken = () => {
    // check for token
    const token = localStorage.getItem('token')
    let bill = localStorage.getItem('bill')
    if (token) {
      // set auth token to header
      setAuthToken(token)
      // decode token
      const decoded = jwt_decode(token)
      // set current user
      setCurrentUser(token)

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // // Logout user
        clearToken()
        setAuthToken(false)
      }
    }

    if (bill) {
      setCurrentBill(bill)
    }
  }

  useEffect(() => {
    checkToken()
    getStalls()
    getProducts()
  }, [])

  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            src="https://scontent.fdad1-1.fna.fbcdn.net/v/t1.15752-9/107902676_641039173459121_7538518412986259566_n.png?_nc_cat=100&_nc_sid=b96e70&_nc_ohc=K6JcOp03ofgAX--diFU&_nc_ht=scontent.fdad1-1.fna&oh=3d531858c39696e42fdb5ce8c9cdcd38&oe=5F30AD6D"
            width="30"
            height="30"
            className="d-inline-block align-top"

          />{' '}
        </Navbar.Brand>
        {/* <Navbar.Toggle /> */}
        <Navbar.Collapse className="justify-content-end">
          {!isAuthenticated ? <>
            <Link className="mr-3" to='/search'>Search</Link>
            <Button className="mr-3" variant="primary" onClick={handleLoginClick}>Login</Button>{' '}
            <Button className="mr-3" variant="primary" onClick={handleRegisterClick}>Register</Button>{' '}
          </> : <>
              {
                user && user.role != 'admin' ?
                  <>
                    <Link
                      className="mr-3" to='/search'>Search</Link>
                    <Link to='/checkout' className="mr-3" variant="info">Checkout</Link>
                  </>
                  : ''}{' '}
              <Button onClick={() => logout()} className="mr-3" variant="primary">Logout</Button>{' '}
            </>}
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isLogin ? <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-label="Name"
              aria-describedby="Name"
              placeholder="Name"
            />
          </InputGroup> : ''}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-mailbox" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
                  <path fillRule="evenodd" d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854z" />
                  <path d="M5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
                </svg>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
              aria-describedby="Email"
              placeholder="Email"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-key-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              aria-label="Password"
              aria-describedby="Password"
              placeholder="Password"
            />
          </InputGroup>
          {!isLogin ? <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-key-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              type='password'
              aria-label="Password Confirm"
              aria-describedby="Password Confirm"
              placeholder="Password Confirm"
            />
          </InputGroup> : ''}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {isLogin ? <Button onClick={loginUser} variant="primary">
            Login
          </Button> : <Button onClick={registerUser} variant="primary">
              Register
          </Button>}
        </Modal.Footer>
      </Modal>
    </>
  )
}
