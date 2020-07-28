import React, { useContext } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import { GlobalContext } from '../../context/GlobalContext'
import { toast } from 'react-toastify'

export default function Checkout() {
  const { user, products, addProductToBill, minusProductFromBill, bill, checkout, isAuthenticated } = useContext(GlobalContext)

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  let total = 0

  const getProductById = id => {
    return products.find(product => product._id == id)
  }

  const checkoutBill = (bill) => {
    if (Object.keys(bill).length !== 0) {
      checkout(bill)
    } else {
      toast.warn('No bill to checkout!', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    isAuthenticated ? <div style={{ margin: '0 20%', padding: '76px 0 20px', textAlign: 'center', backgroundColor: 'rgb(232, 232, 232)', minHeight: '90vh' }}>
      <h3>Bill ID: {dd + mm + yyyy}</h3>

      <div>{user.name}</div>
      <div>{mm + '/' + dd + '/' + yyyy}</div>

      {Object.keys(bill).length !== 0 ? Object.keys(bill).map(e => {
        let product = getProductById(e)
        if (product) {
          total += product.price * bill[`${e}`]
        }

        return product ? <Row>
          <Col style={{ textAlign: 'left', paddingLeft: '55px' }} lg={6}>{product.name} x {bill[`${e}`]}
            <span onClick={() => addProductToBill(e)} className="plus-icon" style={{ marginLeft: '24px', cursor: 'pointer' }}>
              <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
                <path fillRule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z" />
              </svg>
            </span>
            <span onClick={() => minusProductFromBill(e)} className="minus-icon" style={{ marginLeft: '10px', cursor: 'pointer' }}>
              <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-dash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5z" />
              </svg>
            </span>
          </Col>
          <Col style={{ textAlign: 'right', paddingRight: '56px' }} lg={6}>
            {product.price * bill[`${e}`]} VNĐ
          </Col>
        </Row> : ''

      }) : <h4>Checkout successfully! Please waiting, your item will come soon....</h4>}

      {Object.keys(bill).length !== 0 ? <><Row>
        <Col style={{ textAlign: 'left', paddingLeft: '56px' }} lg={6}>Total:</Col>
        <Col style={{ textAlign: 'right', paddingRight: '56px' }} lg={6}>
          {total} VNĐ
        </Col>
      </Row>
        <Button onClick={() => checkoutBill(bill)} style={{ margin: '20px' }}>PAY BILL</Button></> : ''}


    </div > : <Redirect to='/' />
  )
}
