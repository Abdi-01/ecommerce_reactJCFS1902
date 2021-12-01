import axios from "axios"
import { API_URL } from "../../helper"

export const getProductsAction = (search) => {
    return async (dispatch) => {
        try {
            let res;
            // cara 1
            if (search) {
                res = await axios.get(`${API_URL}/products?nama=${search}`)
            } else {
                res = await axios.get(`${API_URL}/products`)
            }
            // cara 2
            // res = await axios.get(`${API_URL}/products${search ? `?nama=${search}` : ``}`)

            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}