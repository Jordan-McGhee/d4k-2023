import React, { useState } from "react";
import AdminOrders from "../components/admin/AdminOrders";
import Button from "../components/FormElements/Button";
import refresh from "../images/icons/refresh.png"
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate()
    return (
        <>

            <div className="flex items-center w-full justify-between px-1">
                <div className="flex items-center" onClick = { () => navigate(0) }>
                    <img src={ refresh } alt="refresh icon" className="w-6 mr-3"/>
                    <p className="text-white text-lg">REFRESH</p>
                </div>

            </div>
            <AdminOrders />
        </>
    )
}

export default Admin