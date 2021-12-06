import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarText, Button, NavItem, NavLink, Collapse, Nav, NavbarToggler, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, InputGroup, Input, Popover, PopoverBody, Dropdown } from 'reactstrap';
import { connect } from 'react-redux'
import { logOutAction } from '../redux/actions'
class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCollapse: false
        }
    }

    render() {
        // console.log(window.location)
        return (
            <Navbar expand="md" className="shadow bg-white">
                <NavbarBrand>
                    <Link to="/">
                        <img src="https://www.sipayo.com/wp-content/uploads/2017/12/e-commerce.png"
                            width="50px" alt="logo-brand" />
                    </Link>
                </NavbarBrand>
                <NavbarToggler onClick={() => this.setState({ openCollapse: !this.state.openCollapse })} />
                <Collapse isOpen={this.state.openCollapse} navbar className="row">
                    <Nav className="col-md-3 d-block d-md-flex">
                        <NavItem>
                            <Link to="/products" className={`nav-link`} style={{ color: "#2d3436", fontWeight: "bold" }} >
                                Products
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink style={{ color: "#2d3436", fontWeight: "bold" }}>
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <div className="col-md-6" >
                        <InputGroup style={{ width: "50%", margin: "auto" }}>
                            <Input placeholder="Cari Barang" />
                            <Button outline color="primary"><span class="material-icons">
                                search
                            </span>
                            </Button>
                        </InputGroup>
                    </div>
                    <div className="col-md-3" style={{ display: "flex", justifyContent: "flex-end" }}>
                        {
                            this.props.loading ?
                                <Spinner color="warning" style={{ marginLeft: "auto", marginRight: 10 }}>
                                    Loading...
                                </Spinner>
                                :
                                this.props.username
                                    ?
                                    <UncontrolledDropdown style={{ marginLeft: "auto" }}>
                                        <DropdownToggle caret nav size="sm" outline className="d-flex align-items-center" style={{ color: "#0984e3" }}>
                                            Hello,<b style={{ fontWeight: "bold" }}>{this.props.username}</b>
                                        </DropdownToggle>
                                        {
                                            this.props.role == "user"
                                                ?
                                                <DropdownMenu right>
                                                    <Link to="/cart-user" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                        <DropdownItem>
                                                            Cart
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="/history-user" className="dropdown-item" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                        Transactions History
                                                    </Link>
                                                    <DropdownItem>
                                                        <Link to="" style={{ color: "#2d3436", textDecoration: "none" }}>
                                                            Profile
                                                        </Link>
                                                    </DropdownItem>
                                                    <DropdownItem divider />
                                                    <DropdownItem onClick={() => {
                                                        localStorage.removeItem("data");
                                                        this.props.logOutAction();
                                                    }}>
                                                        Keluar
                                                    </DropdownItem>
                                                </DropdownMenu>
                                                :
                                                <DropdownMenu right >
                                                    <Link to="/product-management" style={{ color: "#2d3436" }} className="nav-link">
                                                        <DropdownItem>
                                                            Products Management
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to="/transaction-management" style={{ color: "#2d3436" }} className="nav-link">
                                                        <DropdownItem>
                                                            Transactions Management
                                                        </DropdownItem>
                                                    </Link>
                                                    <DropdownItem divider />
                                                    <DropdownItem onClick={() => {
                                                        localStorage.removeItem("data");
                                                        this.props.logOutAction();
                                                    }}>
                                                        Keluar
                                                    </DropdownItem>
                                                </DropdownMenu>
                                        }
                                    </UncontrolledDropdown>
                                    :
                                    < Link to="/auth-page" style={{ marginLeft: "auto" }}>
                                        <Button type="button" color="warning" outline >Masuk dan Daftar</Button>
                                    </Link>
                        }
                    </div>
                </Collapse>
            </Navbar >
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role
    }
}

export default connect(mapToProps, { logOutAction })(NavbarComponent);