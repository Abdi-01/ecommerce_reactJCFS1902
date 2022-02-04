import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { API_URL } from '../helper'
import { getProductsAction } from '../redux/actions';
import { connect } from 'react-redux';
class ModalEditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            images: [],
            edit: false
        }
    }

    printStock = () => {
        if (this.props.detailProduk.stocks) {
            return this.props.detailProduk.stocks.map((item, index) => {
                return <Row>
                    <Col>
                        <Input disabled={!this.state.edit} type="text" defaultValue={item.type} placeholder={`Type-${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input disabled={!this.state.edit} type="number" defaultValue={item.qty} placeholder={`Stock-${index + 1}`} onChange={(e) => this.handleStock(e, index)} />
                    </Col>
                    <Col>
                        <a onClick={() => this.onBtDeleteStock(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    printImages = () => {
        if (this.props.detailProduk.images) {
            return this.props.detailProduk.images.map((item, index) => {
                return <Input disabled={!this.state.edit} type="text" defaultValue={item.url} placeholder={`Images-${index + 1}`} onChange={(e) => this.handleImages(e, index)} />
            })
        }
    }

    btSave = () => {
        let data = {
            ...this.props.detailProduk,
            name: this.inNama.value,
            idbrand: parseInt(this.inBrand.value),
            idcategory: parseInt(this.inCategory.value),
            description: this.inDeskripsi.value,
            price: parseInt(this.inHarga.value),
            stocks: this.state.stocks.length == 0 ? this.props.detailProduk.stock : this.state.stocks,
            images: this.state.images.length == 0 ? this.props.detailProduk.images : this.state.images
        }
        console.log("TESTING SAVE :", data)
        axios.patch(`${API_URL}/products/${this.props.detailProduk.idproduct}`, data)
            .then((res) => {
                if (res.data.success) {
                    this.props.getProductsAction();
                    this.props.btClose()
                    this.setState({ stock: [], images: [], edit: !this.state.edit })
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    handleImages = (e, index) => {
        let temp = [...this.props.detailProduk.images]
        temp[index].url = e.target.value
        this.setState({ images: temp })
    }

    handleType = (e, index) => {
        let temp = [...this.props.detailProduk.stocks];
        temp[index].type = e.target.value
        this.setState({ stocks: temp })
    }

    handleStock = (e, index) => {
        let temp = [...this.props.detailProduk.stocks];
        temp[index].qty = parseInt(e.target.value)
        this.setState({ stocks: temp })
    }

    render() {
        let { name, description, idbrand, idcategory, price } = this.props.detailProduk
        console.log(this.props.detailProduk)
        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.props.btClose} >
                <ModalHeader toggle={this.props.btClose}>Detail Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="textNama">Nama Product</Label>
                        <Input disabled={!this.state.edit} type="text" id="textNama" defaultValue={name} innerRef={elemen => this.inNama = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textDes">Deskripsi</Label>
                        <Input disabled={!this.state.edit} type="text" defaultValue={description} id="textDes" innerRef={elemen => this.inDeskripsi = elemen} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="textBrand">Brand</Label>
                                <Input disabled={!this.state.edit} type="select" id="selectBrand" defaultValue={idbrand} innerRef={elemen => this.inBrand = elemen} >
                                    <option value={null} >Choose...</option>
                                    {
                                        this.props.brandList.map((val, index) => <option value={val.idbrand} key={val.idbrand}>{val.brand}</option>)
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="textKategori">Kategori</Label>
                                <Input disabled={!this.state.edit} type="select" id="selectBrand" defaultValue={idcategory} innerRef={elemen => this.inCategory = elemen}>
                                    <option value={null} >Choose...</option>
                                    {
                                        this.props.categoryList.map((val, index) => <option value={val.idcategory} key={val.idcategory}>{val.category}</option>)
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="textHarga">Harga</Label>
                        <Input disabled={!this.state.edit} type="number" defaultValue={price} id="textHarga" innerRef={elemen => this.inHarga = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Stock</Label>
                        {this.printStock()}
                    </FormGroup>
                    <FormGroup>
                        <Label>Images</Label>
                        {this.printImages()}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    {
                        this.state.edit ?
                            <Button type="button" color="primary" onClick={this.btSave}>Save</Button>
                            : <Button type="button" color="primary" onClick={() => this.setState({ edit: !this.state.edit })}>Edit</Button>
                    }
                    <Button color="secondary" onClick={() => {
                        this.setState({ edit: !this.state.edit })
                        this.props.btClose()
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
const mapToProps = ({ productsReducer }) => {
    return {
        brandList: productsReducer.brand,
        categoryList: productsReducer.category
    }
}

export default connect(mapToProps, { getProductsAction })(ModalEditProduct);