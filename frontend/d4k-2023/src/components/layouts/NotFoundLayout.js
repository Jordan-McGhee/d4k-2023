import React from "react";
import MainNav from "../../navigation/MainNav";
import { Outlet } from "react-router-dom";

const NotFoundLayout = () => {

    return (
        <div>
            <MainNav navClass = "nav-container p-5 top-0 fixed w-full bg-[#86aed6]"/>
                <div className="h-fit overflow-hidden">
                    <Outlet />
                </div>
        </div>
    )
}

export default NotFoundLayout