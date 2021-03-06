import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, FormGroup, Label } from 'reactstrap';
import { API_URL } from '../helper';
import { updateUserCart, deleteCart } from '../redux/actions';

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ongkir: 0
        }
    }

    printCart = () => {
        return this.props.cart.map((value, index) => {
            return (
                <div className="row shadow p-1 mb-3 bg-white rounded" >
                    <div className="col-md-2">
                        <img src={value.url} width="100%" />
                    </div>
                    <div className="col-md-3 d-flex justify-content-center flex-column">
                        <h5 style={{ fontWeight: 'bolder' }}>{value.name}</h5>
                        <h4 style={{ fontWeight: 'bolder' }}>Rp {value.price.toLocaleString()}</h4>
                    </div>
                    <div className="col-md-1 d-flex align-items-center">
                        <h5 style={{ fontWeight: 'bolder' }}>{value.type}</h5>
                    </div>
                    <div className="col-md-5 d-flex align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex" style={{ width: '50%' }}>
                                <span style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => this.onBtDec(index)}>
                                        remove
                                    </span>
                                    <Input placeholder="qty" value={value.qty} style={{ width: "50%", display: 'inline-block', textAlign: 'center' }} />
                                    <span className="material-icons" style={{ cursor: 'pointer' }} onClick={() => this.onBtInc(index)}>
                                        add
                                    </span>
                                </span>
                            </div>
                            <h4>Rp {value.total_price.toLocaleString()}</h4>
                        </div>
                        <Button color="warning" style={{ border: 'none', float: 'right', marginLeft: "1vw" }} onClick={() => this.onBtRemove(index)}>Remove</Button>
                    </div>
                </div>
            )
        })
    }

    onBtInc = (index) => {
        let temp = [...this.props.cart];
        if (temp[index].qty < temp[index].stock_qty) {
            temp[index].qty += 1
        }
        this.props.updateUserCart(temp[index].idcart, temp[index].qty)
    }

    onBtDec = (index) => {
        let temp = [...this.props.cart];
        if (temp[index].qty > 1) {
            temp[index].qty -= 1
        } else {
            this.props.deleteCart(temp[index].idcart);
        }
        this.props.updateUserCart(temp[index].idcart, temp[index].qty)
    }

    onBtRemove = (index) => {
        let temp = [...this.props.cart];
        this.props.deleteCart(temp[index].idcart);
    }

    totalPayment = () => {
        let total = 0;

        this.props.cart.forEach((value, index) => total += value.total_price)
        return total + this.state.ongkir
    }

    onBtCheckOut = () => {
        let date = new Date()
        // yang disimpan = iduser, username, invoice=#INV/ Date getTime(), date, note, total_payment, detail=array, status="Menunggu konfirmasi"
        axios.post(`${API_URL}/userTransactions`, {
            iduser: this.props.iduser,
            username: this.props.username,
            invoice: `#INV/${date.getTime()}`,
            date: date.toLocaleString(),
            note: this.note.value,
            totalPayment: this.totalPayment(),
            ongkir: parseInt(this.state.ongkir),
            detail: [...this.props.cart],
            status: "Menunggu Konfirmasi"
        })
            .then((res) => {
                this.props.updateUserCart([], this.props.iduser)
                this.setState({ ongkir: 0 })
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (<div>
            <h1 className="text-center mt-5">Keranjang Belanja</h1>
            <div className="row m-1">
                <div className="col-8">
                    {this.printCart()}
                </div>
                <div className="col-4">
                    <div className="shadow p-4 mb-3 bg-white rounded">
                        <h3 style={{}}>Total Payment</h3>
                        <h2 style={{ fontWeight: 'bold' }}>Rp. {this.totalPayment().toLocaleString()}</h2>
                        <FormGroup>
                            <Label for="ongkir">Biaya Pengiriman</Label>
                            <Input type="text" id="ongkir" onChange={(e) => this.setState({ ongkir: parseInt(e.target.value) })} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="note">Notes</Label>
                            <Input type="textarea" id="note" innerRef={elemen => this.note = elemen} />
                        </FormGroup>
                        <div className="d-flex justify-content-end">
                            <Button type="button" color="success" onClick={this.onBtCheckOut}>Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

const mapToProps = (state) => {
    console.log(state.transactionsReducer.carts);
    return {
        cart: state.transactionsReducer.carts,
        iduser: state.userReducer.id,
        username: state.userReducer.username
    }
}

export default connect(mapToProps, { updateUserCart, deleteCart })(CartPage);