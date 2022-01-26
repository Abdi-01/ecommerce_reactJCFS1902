const INITIAL_STATE = {
    productsList: [],
    brand: [],
    category: []
}

export const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_PRODUCTS":
            console.log("cek product", action.payload)
            return { ...state, productsList: action.payload };
        case "GET_DATA_BRAND_CATEGORY":
            return { ...state, ...action.payload };
        default:
            return state;
    }
}