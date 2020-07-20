import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import { GlobalProvider } from './context/GlobalContext';


import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Admin from './components/Admin';
import Search from './components/Search';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Container fluid>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/Admin" component={Admin} />
          <Route exact path='/search' component={Search} />
          {/* <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/edit" component={Edit} />
        </Switch> */}
          <Footer />

          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <ToastContainer />
        </Container>
      </Router>
    </GlobalProvider>
  )
}

export default App;
