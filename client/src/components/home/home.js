import React, { useState, useContext, useEffect } from 'react'
import { Row, Col, Carousel, Card, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'

import { GlobalContext } from '../../context/GlobalContext'

export default function Home() {
  const { products, stalls, isAuthenticated, addProductToBill } = useContext(GlobalContext)

  let token = localStorage.getItem('token')
  let isAdmin;
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
            src="https://ae01.alicdn.com/kf/HTB1AhmcSXXXXXatXVXXq6xXFXXXI.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="image-slide"
            src="https://i.pinimg.com/originals/98/14/7d/98147d03785a0ba13e0337b43c382627.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="image-slide"
            src="https://dubaifitnesschallenge.com/wp-content/uploads/2019/10/DFC-breakfast-salad-1920x1080.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <Row>
        <Col style={{ margin: "0 16px 8px", padding: "8px", backgroundColor: "rgb(20, 120, 130)", textAlign: 'center' }}>STALL</Col>
      </Row>

      {
        !!stall ? <>
          <Button onClick={() => setStall('')} style={{ margin: '0 0 8px' }}>Back</Button>
          {products ? <Row>
            {products.filter(product => {
              if (stall)
                return product.stall === stall
              else
                return product
            }).map((product, id) => {
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
            {stalls ? stalls.map(stall => {
              return <Col md={3} xs={6}>
                <Card onClick={() => setStall(stall._id)} style={{ margin: 'auto', cursor: 'pointer' }}>
                  <Card.Img style={{ minHeight: '200px', maxHeight: '200px' }} variant="top" src={`/images/${stall.image}`} />
                  <Card.Body>
                    <Card.Title>{stall.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            }) : <Spinner animation="border" />}
          </Row>
      }

      <Row>
        <Col style={{ margin: "8px 16px 4px", padding: "8px", backgroundColor: "rgb(20, 120, 130)", textAlign: 'center' }}>
          <Button><Link style={{ color: 'rgb(255, 255, 255)' }} to='/checkout'>Checkout</Link></Button>
        </Col>
      </Row>
    </>
  )
}
