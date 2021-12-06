import React from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaksi: []
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/userTransactions?iduser=${this.props.iduser}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ transaksi: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    printHistory = () => {
        return this.state.transaksi.map((value, index) => {
            return <div className="shadow p-3 rounded">
                <div className="shadow-sm p-2">
                    <span>{value.date} <Badge color="warning">{value.status}</Badge> </span>
                    <b style={{ marginLeft: 20 }}>{value.invoice}</b>
                </div>
                <div className="row p-3">
                    <div className="col-md-1">
                        <img src={value.detail[0].image} width="100%" />
                    </div>
                    <div className="col-md-7 d-flex flex-column justify-content-center">
                        <h4 style={{ fontWeight: "bolder" }}>{value.detail[0].nama}</h4>
                        <p className="text-muted">{value.detail[0].qty} x Rp. {value.detail[0].harga.toLocaleString()}</p>
                        <a className="text-muted" style={{ cursor: "pointer" }}>+{value.detail.length - 1} Produk Lainnya</a>
                    </div>
                    <div className="col-md-4">
                        <p className="text-muted">Total Belanja</p>
                        <h4 style={{ fontWeight: "bolder" }}>Rp. {value.totalPayment.toLocaleString()}</h4>
                    </div>
                </div>
            </div>
        })
    }

    render() {
        return (
            <div className="container">
                <h1>History Transaction page user</h1>
                {this.printHistory()}
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.id,
        role: state.userReducer.role
    }
}

export default connect(mapToProps)(HistoryPage);