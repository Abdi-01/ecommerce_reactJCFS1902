import React from 'react';
import { Button, ButtonGroup, Card, CardBody, CardImg, CardTitle, FormGroup, Input, InputGroup, InputGroupText, Label, Spinner } from 'reactstrap'
import { connect } from 'react-redux';
import { getProductsAction, getProductsSort } from '../redux/actions'
import { Link } from 'react-router-dom';
class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            loading: true
        }
    }

    printProducts = () => {
        let { page } = this.state
        return this.props.productsList.slice(page > 1 ? (page - 1) * 8 : page - 1, page * 8).map((value, index) => {
            return <div className="col-3 mt-3">
                <Card className="shadow" style={{ border: "none" }}>
                    <Link to={`/product-detail?id=${value.id}`}
                        style={{ textDecoration: "none", color: "black" }}>
                        <CardImg top
                            src={value.images[0]}
                            width="100%"
                            alt={`${value.nama}-${index}`}
                            className="shadow-sm"
                        />
                        <CardBody>
                            <CardTitle tag="h5" style={{ fontWeight: "bolder" }}>{value.nama}</CardTitle>
                            <CardTitle tag="h6" style={{ fontWeight: "bold" }}>Rp. {value.harga.toLocaleString()}</CardTitle>
                        </CardBody>
                    </Link>
                </Card>
            </div>
        })
    }

    printBtPagination = () => {
        // 1-8 data => 1 button
        // 9-16 data => 2 button
        // 17-24 data => 3 button
        let btn = []
        for (let i = 0; i < Math.ceil(this.props.productsList.length / 8); i++) {
            btn.push(<Button outline color="primary"
                disabled={this.state.page == i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })}>
                {i + 1}
            </Button>)
        }
        return btn;
    }

    btSearch = () => {
        this.props.getProductsAction({
            nama: this.inSearchName.value,
            hargaMax: this.inSearchMax.value,
            hargaMin: this.inSearchMin.value
        })
        this.setState({ page: 1 })
    }

    btReset = () => {
        this.props.getProductsAction()
        this.inSearchName.value = null
        this.inSearchMax.value = null
        this.inSearchMin.value = null
    }

    handleSort = (e) => {
        this.props.getProductsSort({
            field: e.target.value.split('-')[0],
            sortType: e.target.value.split('-')[1]
        })
    }

    render() {
        return (
            <div className="pt-5">
                <div className="container">
                    <div className="shadow bg-white p-2 rounded mb-3">
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <FormGroup>
                                <Label>Nama</Label>
                                <Input type="text" id="text" placeholder="Cari produk"
                                    innerRef={(element) => this.inSearchName = element} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Harga</Label>
                                <div className="d-flex">
                                    <Input type="number" id="numb1" placeholder="Minimum"
                                        innerRef={(element) => this.inSearchMin = element} />
                                    <Input type="number" id="numb2" placeholder="Maksimum"
                                        innerRef={(element) => this.inSearchMax = element} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <Label>Sort</Label>
                                <Input type="select" style={{ width: "250px" }} onChange={this.handleSort}>
                                    <option value="harga-asc">Harga Asc</option>
                                    <option value="harga-desc">Harga Desc</option>
                                    <option value="nama-asc">A-Z</option>
                                    <option value="nama-desc">Z-A</option>
                                    <option value="id-asc">Reset</option>
                                </Input>
                            </FormGroup>

                        </div>
                        <div className="pt-2" style={{ textAlign: "end" }}>
                            <Button outline color="warning" onClick={this.btReset}>Reset</Button>
                            <Button style={{ marginLeft: 16 }} color="primary" onClick={this.btSearch}>Filter</Button>
                        </div>
                    </div>
                    <div className="row">
                        {this.printProducts()}
                    </div>
                    <div className="my-5 text-center">
                        <ButtonGroup>
                            {
                                this.printBtPagination()
                            }
                        </ButtonGroup>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = ({ productsReducer }) => {
    // console.table(productsReducer.productsList)
    return {
        productsList: productsReducer.productsList
    }
}

export default connect(mapToProps, { getProductsAction, getProductsSort })(ProductsPage);