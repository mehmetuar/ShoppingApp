import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from "reactstrap";
import CartSummary from '../cart/CartSummary';
import { Link, useNavigate } from "react-router-dom";

function NaviWrapper(props) {
  const navigate = useNavigate();
  return <Navi {...props} navigate={navigate} />;
}

class Navi extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" className="navi">
          <NavbarBrand href="/">
            <img src="/reset.png" alt="Logo" width="60" height="60" />
          </NavbarBrand>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ms-auto d-flex align-items-center gap-3" navbar>

              {/* Sepet Özeti */}
              <CartSummary
                removeFromCart={this.props.removeFromCart}
                cart={this.props.cart}
              />

              {/* Ana Menü Butonu */}
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => this.props.navigate('/')}
              >
                Ana Menüye Dön
              </button>

              {/* Profil */}
              <Link to="/profile" className="btn btn-outline-primary btn-sm">
                Profil
              </Link>

              {/* Çıkış */}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  this.props.onLogout();
                  window.location.href = "/login";
                }}
              >
                Çıkış Yap
              </button>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NaviWrapper;
