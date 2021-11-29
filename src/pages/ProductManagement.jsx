import axios from 'axios';
import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import ModalEditProduct from '../components/ModalEditProduct';
import ModalProduct from '../components/ModalProduct';
import { API_URL } from '../helper';
class ProductManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            modalEditOpen: false,
            modalOpen: false,
            detailProduk: {},
            thumbnailIdx: 0,
            selectedIndex: null
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
                    {
                        this.state.selectedIndex==index ?
                        <img src={item.images[this.state.thumbnailIdx]} width="80%" alt={item.nama + index} />
                        :
                        <img src={item.images[0]} width="80%" alt={item.nama + index} />
                    }
                    <div>
                        {item.images.map((val, idx) => {
                            return <img src={val} width="20%" alt={item.nama + index}
                                onClick={() => this.setState({ thumbnailIdx: idx, selectedIndex:index })} />
                        })}
                    </div>
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

    onBtDelete = () => {

    }

    render() {
        return (
            <div className="container p-3">
                <h3 className="text-center">Produk Management</h3>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Button type="button" color="success" onClick={() => this.setState({ modalOpen: !this.state.modalOpen })}>Add</Button>
                </div>
                <ModalEditProduct
                    modalOpen={this.state.modalEditOpen}
                    detailProduk={this.state.detailProduk}
                    btClose={() => this.setState({ modalEditOpen: !this.state.modalEditOpen })}
                />
                <ModalProduct modalOpen={this.state.modalOpen}
                    btClose={() => this.setState({ modalOpen: !this.state.modalOpen })}
                    getData={this.getData}
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