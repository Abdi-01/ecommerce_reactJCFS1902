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
import { loginAction, getProductsAction, keepAction, getBrandCategory,getCartAction } from './redux/actions'
import ProductsPage from './pages/ProductsPage';
import { API_URL } from './helper';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFound';
import HistoryPage from './pages/HistoryPage';
import TransactionAdminPage from './pages/TransactionManagement';
import VerificationPage from './pages/VerificationPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.keepLogin()
    this.props.getProductsAction()
    this.props.getBrandCategory()
  }

  keepLogin = async () => {
    try {
      let res = await this.props.keepAction()
      if(res){
        this.props.getCartAction()
      }
      this.setState({ loading: false })
    } catch (error) {
      this.setState({ loading: false })
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <NavbarComponent loading={this.state.loading} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth-page" element={<AuthPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/verification/:token" element={<VerificationPage />} />

          {
            this.props.role == "user" ?
              <>
                <Route path="/cart-user" element={<CartPage />} />
                <Route path="/history-user" element={<HistoryPage />} />
              </>
              :
              this.props.role == "admin" ?
                <>
                  <Route path="/product-management" element={<ProductManagement />} />
                  <Route path="/transaction-management" element={<TransactionAdminPage />} />
                </>
                :
                <Route path="*" element={<NotFoundPage />} />
          }

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    );
  }
}

const mapToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}
export default connect(mapToProps, { loginAction, getProductsAction, keepAction, getBrandCategory, getCartAction })(App);
