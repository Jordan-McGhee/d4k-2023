import React from "react";
import MainNav from "../../navigation/MainNav";
import MobileNav from "../../navigation/MobileNav";
import backgroundImage2 from "../../images/bgmobile2.jpg"
import { Outlet } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import BartabNav from "../../navigation/BartabNav";

const UserLayout = () => {
    let nav = isMobile ? <MobileNav /> : <MainNav />
    return (
        <div>
            {nav}
            <BartabNav />
            {/* <div className="fixed bottom-0 left-0 right-0 bg-slate-100/90 pt-16 z-50 backdrop-blur-md border-solid border-t-2 border-gray-500"></div> */}
            <div className={`App overflow-hidden bg-cover bg-no-repeat bg-top ${!isMobile ? 'mt-20' : ''}`} style={{backgroundImage: `url(${backgroundImage2})`}}>
                <div className="min-h-screen ">
                    <div className="main-container m-5">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLayout