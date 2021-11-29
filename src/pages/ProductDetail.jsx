import React from 'react';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        console.log("CEK URL DETAIL PAGE:", this.props.match)
    }
    render() {
        return (
            <div>
                Detail product
            </div>
        );
    }
}

export default ProductDetail;