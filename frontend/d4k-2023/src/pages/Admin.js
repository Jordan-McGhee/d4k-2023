import React, { useState } from "react";
import AdminOrders from "../components/admin/AdminOrders";
import Button from "../components/FormElements/Button";
import refresh from "../images/icons/refresh.png"
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate()
    return (
        <>
            <AdminOrders />
        </>
    )
}

export default Admin