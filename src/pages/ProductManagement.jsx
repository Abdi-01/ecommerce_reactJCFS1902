import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalEditProduct from '../components/ModalEditProduct';

const API_URL = "http://localhost:2000"

class ProductManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            modalEditOpen:false,
            detailProduk:{}
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/products`)
            .then(res => {
                console.log(res.data)
                this.setState({ productList: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    printProduk = () => {
        return this.state.productList.map((item, index) => {
            return <tr>
                <td>{index + 1}</td>
                <td style={{ width: '20vw', textAlign: 'center' }}>
                    <img src={item.images[0]} width="80%" alt={item.nama + index} />
                </td>
                <td>{item.nama}</td>
                <td>{item.brand}</td>
                <td>{item.kategori}</td>
                <td>Rp. {item.harga.toLocaleString()}</td>
                <td><Button type="button" size="sm" color="warning" onClick={() => this.setState({ detailProduk: item, modalEditOpen: !this.state.modalEditOpen })}>Detail</Button>
                    <Button size="sm" color="danger" onClick={() => this.onBtDelete(item.idproduct)}>Delete</Button></td>
            </tr>
        })
    }

    render() {
        return (
            <div className="container p-3">
                <h3 className="text-center">Produk Management</h3>
                <ModalEditProduct
                    modalOpen={this.state.modalEditOpen}
                    detailProduk={this.state.detailProduk}
                    btClose={() => this.setState({ modalEditOpen: !this.state.modalEditOpen })}
                />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Nama</th>
                            <th>Brand</th>
                            <th>Kategori</th>
                            <th>Harga</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printProduk()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProductManagement;