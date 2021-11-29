import React from 'react';
import { Card, CardBody, CardImg, CardTitle, Input } from 'reactstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    printProducts = () => {
        return this.props.productsList.map((value, index) => {
            return <div className="col-3 mt-2">
                <Card>
                    <Link to={`/product-detail?id=${value.id}`}>
                        <CardImg top
                            src={value.images[0]}
                            width="100%"
                            alt={`${value.nama}-${index}`}
                        />
                        <CardBody>
                            <CardTitle tag="h5" style={{ fontWeight: "bolder" }}>{value.nama}</CardTitle>
                            <CardTitle tag="h5" style={{ fontWeight: "bolder" }}>Rp. {value.harga.toLocaleString()}</CardTitle>
                        </CardBody>
                    </Link>
                </Card>
            </div>
        })
    }

    render() {
        
        return (
            <div className="container">
                <Input type="select" style={{ width: "250px", float: "right" }}>
                    <option value="harga-asc">Harga Asc</option>
                    <option value="harga-desc">Harga Desc</option>
                    <option value="nama-asc">A-Z</option>
                    <option value="nama-desc">Z-A</option>
                    <option value="id-asc">Reset</option>
                </Input>
                <div className="container row">
                    {this.printProducts()}
                </div>
            </div>
        );
    }
}

const mapToProps = ({ productsReducer }) => {
    console.table(productsReducer.productsList)
    return {
        productsList: productsReducer.productsList
    }
}

export default connect(mapToProps)(ProductsPage);