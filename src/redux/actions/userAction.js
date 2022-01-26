import axios from "axios"
import { API_URL } from "../../helper"

export const loginAction = (email, password) => {
    // cara 1
    // return (dispatch) => {
    //     axios.get(`${API_URL}/users?email=${email}&password=${password}`)
    //         .then((response) => {
    //             if (response.data.length > 0) {
    //                 localStorage.setItem("data", JSON.stringify(response.data[0]))
    //                 // dispatch : meneruskan data kereducer
    //                 dispatch({
    //                     type: "LOGIN_SUCCESS",
    //                     payload: response.data[0]
    //                 })
    //             }
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }

    // cara 2
    return async (dispatch) => {
        try {

            let res = await axios.post(`${API_URL}/users/login`, {
                email, password
            })
            if (res.data.success) {
                localStorage.setItem("data", res.data.dataLogin.token)
                // dispatch : meneruskan data kereducer
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data.dataLogin
                })
            }
            return { success: res.data.success }

        } catch (error) {
            console.log(error)
        }
    }
}

export const keepAction = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("data");
            console.log(token)
            if (token) {
                let res = await axios.get(`${API_URL}/users/keep`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    localStorage.setItem("data", res.data.dataLogin.token)
                    // dispatch : meneruskan data kereducer
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data.dataLogin
                    })
                }
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const logOutAction = () => {
    return {
        type: "LOGOUT"
    }
}

export const updateUserCart = (data, iduser) => {
    return async (dispatch, getState) => {
        try {
            console.log("test")
            let res = await axios.patch(`${API_URL}/users/${iduser}`, {
                cart: data
            })

            dispatch({
                type: "UPDATE_CART_USER",
                payload: res.data.cart
            })

            return { success: true, message: "Add to cart success" }

        } catch (error) {
            console.log(error)
        }
    }
}