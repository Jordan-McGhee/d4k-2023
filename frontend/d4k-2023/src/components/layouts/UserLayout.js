import React from "react";
import MainNav from "../../navigation/MainNav";
import backgroundImage2 from "../../images/snowflake-bg-vertical.png"
import { Outlet } from "react-router-dom";

const UserLayout = () => {

    return (
        <div className="App bg-local overflow-hidden max-w-sm" style={{backgroundImage: `url(${backgroundImage2})`}}>
            <MainNav />
            <div className="min-h-screen bg-red-900/75">
                <div className="main-container m-auto p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserLayout