import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Input, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { API_URL } from '../helper';
import { updateUserCart, addToCartAction } from '../redux/actions';
import { Navigate } from 'react-router-dom'
class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0,
            openType: false,
            qty: 1,
            selectedType: {},
            toastOpen: false,
            toastMsg: "",
            redirect: false
        }
    }

    componentDidMount() {
        console.log("CEK URL DETAIL PAGE:", window.location)
        axios.get(`${API_URL}/products${window.location.search}`)
            .then((response) => {
                console.log(response.data)
                this.setState({ detail: response.data.list_data[0] })
            }).catch((err) => {
                console.log(err)
            })
    }

    renderImages = () => {
        let { images } = this.state.detail
        return images.map((item, index) => {
            return (
                <img className="select-image mb-1 shadow bg-white rounded" src={item.url}
                    key={index}
                    width="100%"
                    onClick={() => this.setState({ thumbnail: index })}
                    style={{ borderBottom: this.state.thumbnail == index && "3px solid #407AB1" }}
                />
            )
        })
    }

    onBtDec = () => {
        if (this.state.qty > 1) {
            this.setState({ qty: this.state.qty -= 1 })
        }
    }

    onBtInc = () => {
        if (this.state.selectedType.qty) {
            if (this.state.qty < this.state.selectedType.qty) {
                this.setState({ qty: this.state.qty += 1 })
            } else {
                this.setState({ toastOpen: !this.state.toastOpen, toastMsg: "Stok produk tidak cukup" })
            }
        }
    }

    onBtAddToCart = async () => {
        let { selectedType, detail, qty } = this.state
        if (selectedType.type) {
            // iduser, idproduct, idstock,qty
            let dataCart = {
                idproduct:detail.idproduct,
                idstock:selectedType.idstock,
                qty
            }

            // menggabungkan data cart sebelumnya dari reducer, dengan dataCart baru yg akan ditambahkan
            // let temp = [...this.props.cart];
            // temp.push(dataCart);

            if (this.props.username) {
                let res = await this.props.addToCartAction(dataCart);
                if (res.success) {
                    this.setState({ redirect: true })
                }
            } else {
                this.setState({ toastOpen: !this.state.toastOpen, toastMsg: "Silahkan Login Terlebih Dahulu" })
            }

        } else {
            this.setState({ toastOpen: !this.state.toastOpen, toastMsg: "Pilih tipe produk terlebih dahulu" })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/cart-user" />
        }
        return (
            <div>
                <div>
                    <Toast isOpen={this.state.toastOpen} style={{ position: "fixed", right: 10 }}>
                        <ToastHeader icon="warning"
                            toggle={() => this.setState({ toastOpen: false, toastMsg: "" })}>
                            Add to cart warning
                        </ToastHeader>
                        <ToastBody>
                            {this.state.toastMsg}
                        </ToastBody>
                    </Toast>
                </div>
                <div className="container row p-5 m-auto shadow bg-white rounded mt-4">
                    {
                        this.state.detail.idproduct &&
                        <>
                            <div className="col-md-1">
                                {this.renderImages()}
                            </div>
                            <div className="col-md-7 text-center">
                                <img className="shadow-sm bg-white rounded" src={this.state.detail.images[this.state.thumbnail].url} width="80%" />
                            </div>
                            <div className="col-md-4">
                                <div style={{ borderBottom: '1.5px solid gray' }}>
                                    <h4 style={{ fontWeight: 'bolder' }}>{this.state.detail.name}</h4>
                                    <h6 className="text-mute">{this.state.detail.category}</h6>
                                    <h2 style={{ fontWeight: 'bolder' }}>Rp {this.state.detail.price.toLocaleString()}</h2>
                                </div>
                                <div style={{ borderBottom: '1.5px solid gray' }}>
                                    <div
                                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                        onClick={() => this.setState({ openType: !this.state.openType })}>
                                        Type: {this.state.selectedType.type}</div>
                                    <Collapse isOpen={this.state.openType}>
                                        {
                                            this.state.detail.stocks.map((item, index) => {
                                                return (
                                                    <div>
                                                        <Button outline color="secondary" size="sm"
                                                            style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                            onClick={() => this.setState({ selectedType: item, qty: 1 })}
                                                        > {item.type} : {item.qty}</Button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Collapse>
                                </div>
                                <p className="my-3" style={{ textAlign: "justify" }}>
                                    {this.state.detail.description}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span>Jumlah :</span>
                                    <span style={{ width: '30%', display: 'flex', alignItems: 'center' }}>
                                        <span className="material-icons" style={{ cursor: 'pointer' }} onClick={this.onBtDec}>
                                            remove
                                        </span>
                                        <Input size="sm" placeholder="qty" value={this.state.qty} style={{ width: "40%", display: 'inline-block' }} />
                                        <span className="material-icons" style={{ cursor: 'pointer' }} onClick={this.onBtInc}>
                                            add
                                        </span>
                                    </span>
                                </div>
                                <Button type="button" color="warning" style={{ width: '100%' }} onClick={this.onBtAddToCart}>Add to cart</Button>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        cart: state.userReducer.cart,
        username: state.userReducer.username
    }
}

export default connect(mapToProps, { updateUserCart,addToCartAction })(ProductDetail);