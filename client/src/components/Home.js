import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Carousel, Card, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalContext'

export default function Home() {
  const { products, stalls, isAuthenticated, addProductToBill } = useContext(GlobalContext)

  let token = localStorage.getItem('token')
  let isAdmin
  if (token) {
    let user = jwt_decode(token)
    let { role } = user
    isAdmin = role == 'admin' ? true : false
  }

  const [index, setIndex] = useState(0)
  const [stall, setStall] = useState('')

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const addProduct = id => {
    if (!isAuthenticated) {
      toast.warn('You must login to add product!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      addProductToBill(id)
    }
  }

  return (
    isAdmin ? <Redirect to='/admin' /> : <>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
        <Carousel.Item>
          <img
            className="image-slide"
            src="https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-black-meat-western-food-banner-background-image_194600.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="image-slide"
            src="data:image/jpeg;base64,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"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="image-slide"
            src="https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-black-meat-western-food-banner-background-image_194600.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <Row>
        <Col style={{ margin: "0 16px 8px", padding: "8px", backgroundColor: "rgb(78, 255, 132)", textAlign: 'center' }}>STALL</Col>
      </Row>

      {!!stall ? <>
        <Button onClick={() => setStall('')} style={{ margin: '0 0 8px' }}>Back</Button>
        {products ? <Row>
          {products.filter(product => {
            if (stall)
              return product.stall == stall
            else
              return product
          }).map(product => {
            return <Col md={3} xs={6}>
              <Card style={{ margin: 'auto', cursor: 'pointer' }}>
                <Card.Img style={{ minHeight: '200px', maxHeight: '200px' }} variant="top" src={`/images/${product.image}`} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.price} VNĐ</Card.Text>
                  <Button onClick={() => addProduct(product._id)} variant="primary">ADD</Button>
                </Card.Body>
              </Card>
            </Col>
          })}
        </Row> : <h3>Loading...</h3>}
      </> : <Row>
          {!!stalls ? stalls.map(stall => {
            return <Col md={3} xs={6}>
              <Card onClick={() => setStall(stall._id)} style={{ margin: 'auto', cursor: 'pointer' }}>
                <Card.Img style={{ minHeight: '200px', maxHeight: '200px' }} variant="top" src={`/images/${stall.image}`} />
                <Card.Body>
                  <Card.Title>{stall.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          }) : <Spinner animation="border" />}
        </Row>}

      <Row>
        <Col style={{ margin: "8px 16px 4px", padding: "8px", backgroundColor: "rgb(78, 255, 132)", textAlign: 'center' }}>
          <Button><Link style={{ color: 'rgb(255, 255, 255)' }} to='/checkout'>THANH TOÁN</Link></Button>
        </Col>
      </Row>
    </>
  )
}
