import React from 'react';
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
                    Ecommerce
                </NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                <Collapse isOpen={this.state.openCollapse} navbar>
                    <Nav>
                        <NavItem>
                            <NavLink>
                                Products
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Button type="button" style={{ marginLeft: "auto" }}>Masuk dan Daftar</Button>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavbarComponent;