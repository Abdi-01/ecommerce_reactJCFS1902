const INITIAL_STATE = {
    productList: []
}

export const productsreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_PRODUCTS":
            return { ...state, productList: action.payload };
        default:
            return state;
    }
}