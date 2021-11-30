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
import { loginAction, getProductsAction } from './redux/actions'
import ProductsPage from './pages/ProductsPage';
import { API_URL } from './helper';
import ProductDetail from './pages/ProductDetail';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.keepLogin()
    this.getProducts()
  }

  keepLogin = () => {
    let local = localStorage.getItem("data");
    if (local) {
      // re-assign variable local dengan JSON parse
      local = JSON.parse(local)
      axios.get(`${API_URL}/users?email=${local.email}&password${local.password}`)
        .then((res) => {
          console.log("keepLogin berhasil ==>", res.data)
          this.setState({ loading: false })
          this.props.loginAction(res.data[0])
        }).catch((err) => {
          this.setState({ loading: false })
          console.log(err)
        })
    } else {
      this.setState({ loading: false })
    }
  }

  getProducts = () => {
    axios.get(`${API_URL}/products`)
      .then((response) => {
        this.props.getProductsAction(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <NavbarComponent loading={this.state.loading} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth-page" element={<AuthPage />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product-detail" element={<ProductDetail />} />
        </Routes>
      </div>
    );
  }
}

export default connect(null, { loginAction, getProductsAction })(App);
