import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { API_URL } from '../helper';
import { verifyAction } from '../redux/actions';

const VerificationPage = (props) => {
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false);
    const verify = async () => {
        try {
            let token = window.location.pathname.split("/")[2]

            console.log(token)
            let res = await axios.get(API_URL + `/users/verify`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            localStorage.setItem("data", res.data.dataLogin.token);
            delete res.data.dataLogin.token;
            dispatch(verifyAction(res.data.dataLogin))
            if (res.data.success) {
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <Button type='button' onClick={verify}>Verifikasi Akun</Button>
        </div>
    )
}

export default VerificationPage;