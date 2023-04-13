import React from "react";
import AdminNav from "../../navigation/AdminNav";
import backgroundImage2 from "../../images/snowflake-bg-vertical.png"
import { Outlet } from "react-router-dom";

const AdminLayout = () => {

    return (
        <div>
            <AdminNav />
            <div className="App bg-local overflow-hidden mt-24" style={{backgroundImage: `url(${backgroundImage2})`}}>
                <div className="min-h-screen bg-red-900/75">
                    <div className="main-container m-auto p-5">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout