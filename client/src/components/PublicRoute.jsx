import React from 'react'
import {useLocation, Navigate} from "react-router-dom";
import toast from "react-hot-toast";

const PublicRoute = ({children}) => {
    const location = useLocation()

    if (localStorage.getItem("token")) {
        return <Navigate to="/" state={{from: location}} replace />
    }

    return children
}

export default PublicRoute