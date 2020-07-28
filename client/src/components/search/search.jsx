import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Carousel, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import SearchBox from '../search-box/search-box';
import { GlobalContext } from '../../context/GlobalContext';
import accents from 'remove-accents';


const Search = () => {
  const { products, stalls, isAuthenticated, addProductToBill } = useContext(GlobalContext);
  let token = localStorage.getItem('token')
  let isAdmin;
  if (token) {
    let user = jwt_decode(token)
    let { role } = user
    isAdmin = role == 'admin' ? true : false
  }
  const [index, setIndex] = useState(0);
  const [stall, setStall] = useState('');
  const [searchField, setSearchField] = useState('search');

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const onSearchChange = event => {
    if (event.target.value === '') {
      setSearchField('search');
    } else {
      setSearchField(event.target.value);
    }
  }
  debugger;
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
    <React.Fragment>
      <Row>
        <Col style={{ margin: "10rem 16px 8px", padding: "8px", backgroundColor: "rgb(20, 120, 130)", textAlign: 'center' }}>STALL</Col>
      </Row>

      <SearchBox onChange={onSearchChange} />
      {
        !stall ? <>
          <Button onClick={() => setStall('')} style={{ margin: '0 0 8px' }}>Back</Button>
          {
            products ?
              <Row>
                {
                  products.filter(product => {
                    if (stall)
                      return product.stall == stall
                    else
                      return product
                  })
                    .filter((product, idx) => accents.remove(product.name.toLowerCase()).includes(accents.remove(searchField.toLowerCase())))
                    .map((product, idx) => {
                      return <Col md={3} xs={6} key={idx}>
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
              </Row> : <h3>Loading...</h3>
          }
        </> : <Row>
            {!stalls ? stalls.map(stall => {
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
    </React.Fragment>
  )
}

export default Search;