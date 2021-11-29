import React from 'react';
import { Input } from 'reactstrap'
import { connect } from 'react-redux';
class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    printProducts = () => {

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