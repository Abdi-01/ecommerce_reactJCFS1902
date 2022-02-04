const INITIAL_STATE = {
    carts: [],
    transactions: []
}

export const transactionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_CART":
            console.log("DATA CART USER",action.payload)
            return { ...state, carts: action.payload }
        default:
            return state
    }
}