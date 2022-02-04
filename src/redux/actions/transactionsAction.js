import axios from "axios";
import { API_URL } from "../../helper";


export const getCartAction = () => {
    return async (dispatch) => {
        try {

            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.get(API_URL + '/transactions/carts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                console.log(res.data)

                dispatch({
                    type: "GET_CART",
                    payload: res.data.list_data
                })
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const addToCartAction = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log("test")
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.post(`${API_URL}/transactions/carts`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (res.data.success) {
                    dispatch(getCartAction())
                    return { success: true, message: "Add to cart success" }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateUserCart = (idcart, qty) => {
    return async (dispatch, getState) => {
        try {
            console.log("test")
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.patch(`${API_URL}/transactions/carts/${idcart}`, {
                    qty
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (res.data.success) {
                    dispatch(getCartAction())
                    return { success: true, message: "Update cart success" }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteCart = (idcart) => {
    return async (dispatch, getState) => {
        try {
            console.log("test")
            let token = localStorage.getItem('data')
            if (token) {
                let res = await axios.delete(`${API_URL}/transactions/carts/${idcart}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (res.data.success) {
                    dispatch(getCartAction())
                    return { success: true, message: "Add to delete success" }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}