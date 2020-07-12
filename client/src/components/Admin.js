import React, { useContext, useState, useEffect } from 'react'
import { Row, Col, Tabs, Tab, Table, Card, Button, Form, Modal } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

import { GlobalContext } from '../context/GlobalContext'

export default function Admin() {
  const { products, stalls, addNewStall, addNewProduct, bills, getBills } = useContext(GlobalContext)

  useEffect(() => {
    getBills()
  }, [])

  let token = localStorage.getItem('token')
  let isAdmin
  if (token) {
    let user = jwt_decode(token)
    let { role } = user
    isAdmin = role == 'admin' ? true : false
  }

  const [showNewProduct, setShowNewProduct] = useState(false)
  const [showNewStall, setShowNewStall] = useState(false)

  const handleCloseNewProduct = () => setShowNewProduct(false)
  const handleShowNewProduct = () => setShowNewProduct(true)
  const handleCloseNewStall = () => setShowNewStall(false)
  const handleShowNewStall = () => setShowNewStall(true)

  const [selectedStall, setSelectedStall] = useState('')

  const [name, setName] = useState('')
  const [price, setPrice] = useState(1)
  const [stall2, setStall2] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const newProduct = async () => {
    if (name && price && stall2 && selectedFile) {
      try {
        const data = new FormData()
        data.append('name', name)
        data.append('price', price)
        data.append('stall', stall2)
        data.append('photo', selectedFile)
        const res = await axios.post('/api/products', data)
        handleCloseNewProduct()
        setName('')
        setPrice(1)
        setStall2('')
        setSelectedFile(null)
        addNewProduct(res.data)
      } catch (err) {
        console.log(err)
      }
    } else {

    }
  }

  const newStall = async () => {
    if (name && selectedFile) {
      try {
        const data = new FormData()
        data.append('name', name)
        data.append('photo', selectedFile)
        const res = await axios.post('/api/products/stalls', data)
        handleCloseNewStall()
        setName('')
        setSelectedFile(null)
        addNewStall(res.data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const getProductById = id => {
    return products.find(product => product._id == id)
  }

  return (
    isAdmin ? <Row style={{ minHeight: '90vh', paddingTop: 56 }}>
      <Col>
        <Tabs defaultActiveKey="products">
          <Tab eventKey="products" title="Products">
            <Form.Group style={{ margin: '8px 0 4px' }}>
              <Row>
                <Col lg={2}>
                  <Button onClick={handleShowNewProduct}>NEW PRODUCT</Button>
                </Col>
                <Col lg={2}><Button onClick={handleShowNewStall}>NEW STALL</Button></Col>
                <Col lg={3}>
                  <Form.Control as="select" onChange={e => setSelectedStall(e.target.value)}>
                    <option value=''>All stalls</option>
                    {stalls ? stalls.map(stall => <option value={stall._id}>{stall.name}</option>) : ''}
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <Table striped bordered hover style={{ margin: '4px 0' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.filter(product => {
                  if (!!selectedStall)
                    return product.stall == selectedStall
                  else
                    return product
                }).map((product, index) => {
                  return <tr>
                    <td>{index + 1}</td>
                    <td> <Card.Img style={{ minWidth: '200px', maxWidth: '200px' }} variant="top" src={`/images/${product.image}`} /></td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td><Button>Delete</Button></td>
                  </tr>
                })}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="bills" title="Bills">
            <Table striped bordered hover style={{ margin: '8px 0 4px' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Products Ordered</th>
                </tr>
              </thead>
              <tbody>
                {bills ? bills.map((bill, index) => <tr>
                  <td>{index + 1}</td>
                  <td>{bill.user.name}</td>
                  <td>{bill.user.email}</td>
                  <td>
                    {Object.keys(bill.products).map(e => {
                      return <div>{getProductById(e).name} x {bill.products[`${e}`]}</div>
                    })}
                  </td>
                </tr>) : ''}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Col>

      <Modal show={showNewProduct} onHide={handleCloseNewProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Create new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control onChange={(e) => setName(e.target.value)} style={{ marginBottom: '12px' }} type="text" placeholder="New product's name" />
            <Form.Control onChange={(e) => setPrice(e.target.value)} style={{ marginBottom: '12px' }} type="number" min={1} placeholder="New product's price" />
            <Form.Group>
              <Form.Control style={{ marginBottom: '12px' }} as="select" onChange={e => setStall2(e.target.value)}>
                <option value=''>Choose stall of new product</option>
                {stalls ? stalls.map(stall => <option value={stall._id}>{stall.name}</option>) : ''}
              </Form.Control>
              <Form.File
                onChange={(e) => setSelectedFile(e.target.files[0])}
                id="" label="Choose image for new product" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNewProduct}>
            Cancel
          </Button>
          <Button variant="primary" onClick={newProduct}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNewStall} onHide={handleCloseNewStall}>
        <Modal.Header closeButton>
          <Modal.Title>Create new stall</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control onChange={(e) => setName(e.target.value)} style={{ marginBottom: '12px' }} type="text" placeholder="Enter name of new stall" />
            <Form.Group>
              <Form.File onChange={(e) => setSelectedFile(e.target.files[0])} id="" label="Choose image for stall" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNewStall}>
            Cancel
          </Button>
          <Button variant="primary" onClick={newStall}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Row> : <Redirect to='/' />
  )
}
