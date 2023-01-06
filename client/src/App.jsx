import React, {useState} from "react";
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from "./pages/404.jsx";
import InternalServerError from "./pages/500.jsx";
import Homepage from "./pages/ Homepage.jsx";
import {Routes, Route} from 'react-router-dom'
import {Toaster} from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red"
}

const App = () => {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <Homepage/>
                    </ProtectedRoute>
                } />
                <Route path="/register" element={
                    <PublicRoute>
                        <Register/>
                    </PublicRoute>
                } />
                <Route path="/login" element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                } />
                <Route path="/404" element={<NotFound/>} />
                <Route path="/500" element={<InternalServerError/>} />
            </Routes>
        </>
    )
}
export default App