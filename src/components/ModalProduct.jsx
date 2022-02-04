import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { API_URL } from '../helper';
import { getProductsAction } from '../redux/actions';
class ModalProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            images: [],
            defaultImage: "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"
        }
    }

    // componentDidMount() {

    // }


    onBtAdd = () => {
        let formData = new FormData();
        let data = {
            idbrand: parseInt(this.inBrand.value),
            idcategory: parseInt(this.inCategory.value),
            name: this.inNama.value,
            description: this.inDeskripsi.value,
            price: parseInt(this.inHarga.value),
            stocks: this.state.stocks
        }
        console.log("New products :", data)
        if (data.name == "" || data.idbrand == "" || data.description == "" || data.idcategory == "" || data.stocks.length == 0 || this.state.images.length == 0) {
            alert("Isi semua form")
        } else {
            // menambahkan data kedalam formData
            formData.append('data', JSON.stringify(data));

            // menambahkan file image yang akan diupload
            this.state.images.forEach(val => formData.append('images', val.file))

            axios.post(API_URL + '/products', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('data')}`
                }
            })
                .then(res => {
                    console.log("cek add product", res.data)
                    this.props.getProductsAction()
                    alert('Add Product Success')
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    onBtAddStock = () => {
        // let tempStock = [...this.state.stock]
        this.state.stocks.push({ type: null, qty: null })
        this.setState({ stocks: this.state.stocks })
    }

    // menambah penampung data image pada state.images
    onBtAddImages = () => {
        this.state.images.push("")
        this.setState({ images: this.state.images })
    }

    printStock = () => {
        if (this.state.stocks.length > 0) {
            return this.state.stocks.map((item, index) => {
                return <Row>
                    <Col>
                        <Input type="text" placeholder={`Type-${index + 1}`} onChange={(e) => this.handleType(e, index)} />
                    </Col>
                    <Col>
                        <Input type="number" placeholder={`Stock-${index + 1}`} onChange={(e) => this.handleStock(e, index)} />
                    </Col>
                    <Col>
                        <a className="btn btn-outline-danger" onClick={() => this.onBtDeleteStock(index)} style={{ cursor: 'pointer' }}>Delete</a>
                    </Col>
                </Row>
            })
        }
    }

    // render element input form image
    printImages = () => {
        if (this.state.images.length > 0) {
            return this.state.images.map((item, index) => {
                return <div className='col-4'>
                    <a className="m-0 btn btn-danger btn-sm" onClick={() => this.onBtDeleteImage(index)}
                        style={{ cursor: 'pointer', position: "relative", top:15, float:"right"}}>
                        <span className="material-icons ">
                            delete
                        </span>
                    </a>
                    <img
                        id="imagePreview"
                        width="100%"
                        src={item.file ? URL.createObjectURL(item.file) : this.state.defaultImage} />
                    <Input className='p-1' type="file" placeholder={`Select Images-${index + 1}`}
                        onChange={(e) => this.handleImages(e, index)} />
                </div>
                // return <Row>
                //     <Col>
                //         <Input type="file" placeholder={`Select Images-${index + 1}`}
                //             onChange={(e) => this.handleImages(e, index)} />
                //     </Col>
                //     <Col>
                //         <a className="btn btn-outline-danger" onClick={() => this.onBtDeleteImage(index)} style={{ cursor: 'pointer' }}>Delete</a>
                //     </Col>
                // </Row>
            })
        }
    }

    onBtDeleteStock = (index) => {
        this.state.stocks.splice(index, 1)
        this.setState({ stocks: this.state.stocks })
    }

    onBtDeleteImage = (index) => {
        this.state.images.splice(index, 1)
        this.setState({ images: this.state.images })
    }

    // Untuk set value kedalam state.images
    handleImages = (e, index) => {
        console.log(e.target.files[0])
        let temp = [...this.state.images]
        temp[index] = { name: e.target.files[0].name, file: e.target.files[0] }
        this.setState({ images: temp })
    }

    handleType = (e, index) => {
        let temp = [...this.state.stocks]
        temp[index].type = e.target.value;
        this.setState({ stocks: temp })
    }

    handleStock = (e, index) => {
        let temp = [...this.state.stocks]
        temp[index].qty = parseInt(e.target.value)
        this.setState({ stocks: temp })
    }

    onBtCancel = () => {
        this.setState({ stocks: [], images: [] })
        // fungsi untuk close modal
        this.props.btClose()
    }

    render() {
        console.log('ModalOpen', this.props.modalOpen)
        return (
            <Modal isOpen={this.props.modalOpen} toggle={this.props.btClose} >
                <ModalHeader toggle={this.props.btClose}>Add Product</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="textNama">Nama Product</Label>
                        <Input type="text" id="textNama" innerRef={elemen => this.inNama = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textDes">Deskripsi</Label>
                        <Input type="text" id="textDes" innerRef={elemen => this.inDeskripsi = elemen} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="selectBrand">Brand</Label>
                                <Input type="select" id="selectBrand" innerRef={elemen => this.inBrand = elemen} defaultValue={null}>
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
                                <Input type="select" id="selectBrand" innerRef={elemen => this.inCategory = elemen}>
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
                        <Input type="number" id="textHarga" innerRef={elemen => this.inHarga = elemen} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Stock</Label>
                        <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} onClick={this.onBtAddStock}>Add Stock</Button>
                        {this.printStock()}
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <Label>Images</Label>
                        <Button outline color="success" type="button" size="sm" style={{ float: 'right' }} onClick={this.onBtAddImages} >Add Image</Button>
                        <div className='row'>
                            {this.printImages()}
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="primary" onClick={this.onBtAdd}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.onBtCancel}>Cancel</Button>
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

export default connect(mapToProps, { getProductsAction })(ModalProduct);