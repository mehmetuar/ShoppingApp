import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import './App7.css';
import Navi from './components/layout/Navi';
import CategoryList from './components/categories/CategoryList';
import CategoryMenu from './components/categories/CategoryMenu';
import ProductList from './pages/Product/ProductList';
import CartList from './components/cart/CartList';

import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile/Profile';

import ProtectedRoute from './routes/ProtectedRoute';


export default class App extends Component {

  state = {
    isAuthenticated: false,
    currentUser: null,
    currentCategory: "",
    products: [],
    cart: [],
    users: [],
  };


  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName })
    this.getProducts(category.id);
  };

  componentDidMount() {
    this.getProducts();

    const savedUsers = localStorage.getItem("users");
    const isLoggedIn = localStorage.getItem("loggedIn");
    const currentUser = localStorage.getItem("currentUser");

    if (savedUsers) {
      this.setState({ users: JSON.parse(savedUsers) });
    }

    if (isLoggedIn === "true" && currentUser) {
      this.setState({
        isAuthenticated: true,
        currentUser: JSON.parse(currentUser),
      });
    }
  }




  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart })
    alertify.success(product.productName + " sepete eklendi.", 2);
  }

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id)
    this.setState({ cart: newCart })
  }

  increaseQuantity = (product) => {
    const newCart = this.state.cart.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    this.setState({ cart: newCart });
  };

  decreaseQuantity = (product) => {
    const newCart = this.state.cart
      .map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    this.setState({ cart: newCart });
  };

  handleLogin = (credentials) => {
    const user = this.state.users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (user) {
      this.setState({ isAuthenticated: true, currentUser: user });
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      alertify.success("Giriş başarılı!");
    } else {
      alertify.error("Geçersiz kullanıcı adı veya şifre!");
    }
  };


  handleRegister = (newUser) => {
    this.setState(
      (prevState) => ({
        users: [...prevState.users, newUser],
      }),
      () => {
        // state güncellendikten sonra localStorage’a yaz
        localStorage.setItem("users", JSON.stringify(this.state.users));
      }
    );
  };
  handleLogout = () => {
    this.setState({ isAuthenticated: false, currentUser: null });
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
  };

  handleDeleteAccount = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kullanıcıyı user listesinden çıkar
    const updatedUsers = users.filter(user => user.username !== currentUser.username);

    // Güncellenmiş user listesi ve session’ı temizle
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loggedIn");

    this.setState({
      isAuthenticated: false,
      currentUser: null
    });
  };

  render() {
    let ProductInfo = { title: "Product List" }
    let CategoryInfo = { title: "Category List" }

    return (
      <Router>
        <Container>
          {this.state.isAuthenticated && (
            <Navi removeFromCart={this.removeFromCart}
              cart={this.state.cart}
              onLogout={this.handleLogout}
            />
          )}


          <Routes>

            <Route
              path="/login"
              element={
                this.state.isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login onLogin={this.handleLogin} />
                )
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                  <CategoryMenu
                    onCategoryClick={(category) => {
                      this.setState({ currentCategory: category.name });
                      this.getProducts(category.id);
                    }}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                  <ProductList
                    products={this.state.products}
                    addToCart={this.addToCart}
                    currentCategory={this.state.currentCategory}
                    info={{ title: "Ürünler" }}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/register"
              element={<Register onRegister={this.handleRegister} />}
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                  <CartList
                    cart={this.state.cart}
                    removeFromCart={this.removeFromCart}
                    increaseQuantity={this.increaseQuantity}
                    decreaseQuantity={this.decreaseQuantity}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                  <Profile
                    currentUser={this.state.currentUser}
                    onDeleteAccount={this.handleDeleteAccount}
                  />
                </ProtectedRoute>
              }
            />

          </Routes>
        </Container>
      </Router>
    );
  }
}
