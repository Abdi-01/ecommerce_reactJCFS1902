import axios from "axios"
import { API_URL } from "../../helper"

export const getProductsAction = (search = null) => {
    return async (dispatch) => {
        try {
            let res;
            // cara 1
            console.log("cek", search)
            if (search) {
                if (search.nama) {
                    if (search.hargaMax > 0 && search.hargaMin > 0) {
                        res = await axios.get(`${API_URL}/products?harga_gte=${search.hargaMin}&harga_lte=${search.hargaMax}&nama=${search.nama}`)
                    } else {
                        res = await axios.get(`${API_URL}/products?nama=${search.nama}`)
                    }
                } else {
                    res = await axios.get(`${API_URL}/products?harga_gte=${search.hargaMin}&harga_lte=${search.hargaMax}`)
                }
            } else {
                console.log("cek")
                res = await axios.get(`${API_URL}/products`)
            }
            // cara 2
            // res = await axios.get(`${API_URL}/products${search ? `?nama=${search}` : ``}`)
            console.log("data products", res.data)
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data.list_data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getBrandCategory = () => {
    return async (dispatch) => {
        try {
            let resBrand = await axios.get(`${API_URL}/products/brand`);
            let resCategory = await axios.get(`${API_URL}/products/category`);
            console.log("data products", { brand: resBrand.data.list_data, category: resCategory.data.list_data })
            dispatch({
                type: "GET_DATA_BRAND_CATEGORY",
                payload: { brand: resBrand.data.list_data, category: resCategory.data.list_data }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getProductsSort = (sort) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/products?_sort=${sort.field}&_order=${sort.sortType}`)
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}