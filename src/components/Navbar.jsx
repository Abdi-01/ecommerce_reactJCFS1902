import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarText, Button, NavItem, NavLink, Collapse, Nav, NavbarToggler } from 'reactstrap';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCollapse: false
        }
    }
    render() {
        return (
            <Navbar expand="md">
                <NavbarBrand>
                    <Link to="/">
                        <img src="https://www.sipayo.com/wp-content/uploads/2017/12/e-commerce.png"
                            width="50px" alt="logo-brand" />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                <Collapse isOpen={this.state.openCollapse} navbar>
                    <Nav>
                        <NavItem>
                            <Link to="/product-management" className="nav-link">
                                Products Management
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Link to="/auth-page" style={{ marginLeft: "auto" }}>
                        <Button type="button" color="warning" outline >Masuk dan Daftar</Button>
                    </Link>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavbarComponent;