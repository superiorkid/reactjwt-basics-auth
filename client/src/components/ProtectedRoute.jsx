import React from 'react'
import {useLocation, Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const location = useLocation()

    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return children
}

export default ProtectedRoute