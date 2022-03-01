import React, {useEffect} from 'react';
import {logout, reset} from "../features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {toast} from "react-toastify";


const DashBoardGM = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    useEffect(() => {
        if(!user) {
            navigate('/');
        }
        else {
            toast.success('Bienvenue '+ user.name);
        }
    }, [user, navigate])

    return (
        <div>
            <h1>Dashboard GM</h1>
            <Button variant='contained'
                    color='error'
                    sx={{ m: 30 }}
                    onClick={onLogout}
            >
                Logout
            </Button>
        </div>
    );
};

export default DashBoardGM;