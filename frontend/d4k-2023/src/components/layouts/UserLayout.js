import React from "react";
import MainNav from "../../navigation/MainNav";
import MobileNav from "../../navigation/MobileNav";
import backgroundImage2 from "../../images/bgmobile2.jpg"
import { Outlet } from "react-router-dom";
import { isMobile } from 'react-device-detect';

const UserLayout = () => {
    let nav = isMobile ? <MobileNav /> : <MainNav />
    return (
        <div>
             {nav}
            <div className={`App bg-local overflow-hidden ${!isMobile ? 'mt-20' : ''}`} style={{backgroundImage: `url(${backgroundImage2})`}}>
                <div className="min-h-screen ">
                    <div className="main-container m-auto p-5 max-w-md">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLayout