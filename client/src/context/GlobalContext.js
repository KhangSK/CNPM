import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'

import AppReducer from './AppReducer'

import clearToken from '../utils/clearToken'
import setAuthToken from '../utils/setAuthToken'

// init state
const initState = {
  isAuthenticated: false,
  user: {},
  products: [],
  bill: {},
  bills: [],
  stalls: [],
  errors: [],
  loading: true
}

// create context
export const GlobalContext = createContext(initState)

// provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initState)

  // actions
  async function getStalls() {
    try {
      const res = await axios.get('/api/products/stalls')

      dispatch({
        type: 'GET_STALLS',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  async function getProducts() {
    try {
      const res = await axios.get(`/api/products`)

      dispatch({
        type: 'GET_PRODUCTS',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  async function login(userData) {
    try {
      const res = await axios.post(`/api/auth/login`, userData)
      const { token } = res.data

      setCurrentUser(token)
    } catch (err) {
      toast.warn('Login Failed!', {
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

  async function register(userData) {
    try {
      const res = await axios.post(`/api/auth/register`, userData)

      toast.success('Register Successful!', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.warn('Register Failed!', {
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

  function setCurrentUser(token) {
    // set token to localStorage
    localStorage.setItem('token', token)
    // set token to auth header
    setAuthToken(token)
    // decode token
    const decoded = jwt_decode(token)

    dispatch({
      type: 'SET_CURRENT_USER',
      payload: decoded
    })
  }

  function logout(token) {

    clearToken()
    setAuthToken(false)

    dispatch({
      type: 'LOGOUT_USER'
    })
  }

  function setCurrentBill(bill) {
    if (bill) {
      dispatch({
        type: 'SET_CURRENT_BILL',
        payload: JSON.parse(bill)
      })
    }
  }

  function addProductToBill(id) {
    toast.success('ADDED!', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const bill = JSON.parse(localStorage.getItem('bill'))

    if (bill && Object.keys(bill).includes(id)) {
      bill[`${id}`] += 1
      localStorage.setItem('bill', JSON.stringify(bill))
    } else {
      if (bill) {
        bill[`${id}`] = 1
        localStorage.setItem('bill', JSON.stringify(bill))
      } else {
        const product = { [id]: 1 }
        localStorage.setItem('bill', JSON.stringify(product))
      }
    }
    dispatch({
      type: 'ADD_PRODUCT_TO_BILL',
      payload: id
    })
  }

  function minusProductFromBill(id) {
    toast.success('MINUS!', {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const bill = JSON.parse(localStorage.getItem('bill'))

    if (bill && Object.keys(bill).includes(id)) {
      if (bill[`${id}`] == 1) {
        delete bill[`${id}`]
      } else {
        bill[`${id}`] += -1
      }

      localStorage.setItem('bill', JSON.stringify(bill))
    }
    dispatch({
      type: 'MINUS_PRODUCT_FROM_BILL',
      payload: id
    })
  }

  async function checkout(bill) {
    try {
      const res = await axios.post(`/api/bills/checkout`, bill)
      if (res.data.success) {
        localStorage.removeItem('bill')
        dispatch({
          type: 'CLEAR_BILL'
        })
        toast.success('Checkout Successful!', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      toast.warn('ERROR!', {
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

  function addNewStall(stall) {
    dispatch({
      type: 'ADD_NEW_STALL',
      payload: stall
    })
  }

  function addNewProduct(product) {
    dispatch({
      type: 'ADD_NEW_PRODUCT',
      payload: product
    })
  }

  async function getBills() {
    try {
      const res = await axios.get('/api/bills');
      dispatch({
        type: 'GET_BILLS',
        payload: res.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  function deleteProductWithId(id) {
    try {
      toast.success('Delete Successful!', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: 'DELETE_PRODUCT',
        payload: id
      });
    } catch (err) {
      toast.warn('ERROR!', {
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

  return (<GlobalContext.Provider value={{
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    products: state.products,
    bill: state.bill,
    bills: state.bills,
    stalls: state.stalls,
    errors: state.errors,
    loading: state.loading,
    getStalls,
    getProducts,
    login,
    register,
    setCurrentUser,
    addProductToBill,
    setCurrentBill,
    minusProductFromBill,
    checkout,
    logout,
    addNewStall,
    addNewProduct,
    getBills,
    deleteProductWithId
  }}>
    {children}
  </GlobalContext.Provider>)
}