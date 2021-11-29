import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthPage from './pages/AuthPage';
import NavbarComponent from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductManagement from './pages/ProductManagement';
import axios from 'axios';
import { connect } from 'react-redux'
import { loginAction } from './redux/actions'
import ProductsPage from './pages/ProductsPage';

const API_URL = "http://localhost:2000"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.keepLogin()
  }

  keepLogin = () => {
    let local = JSON.parse(localStorage.getItem("data"));
    if (local) {
      axios.get(`${API_URL}/users?email=${local.email}&password${local.password}`)
        .then((res) => {
          console.log("keepLogin berhasil ==>", res.data)
          this.props.loginAction(res.data[0])
        }).catch((err) => {
          console.log(err)
        })
    }
  }

  render() {
    return (
      <div>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth-page" element={<AuthPage />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/products" element={<ProductsPage/>} />
        </Routes>
      </div>
    );
  }
}

export default connect(null, { loginAction })(App);
