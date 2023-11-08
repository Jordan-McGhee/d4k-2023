import React from "react";
import MainNav from "../../navigation/MainNav";
import MobileNav from "../../navigation/MobileNav";
import BartabNav from "../../navigation/BartabNav";
import backgroundImage2 from "../../images/bgmobile2.jpg"
import { Outlet } from "react-router-dom";
import { isMobile, isSmartTV } from 'react-device-detect';
import { useLocation } from 'react-router-dom'

const UserLayout = () => {
    
    const location = useLocation()
    const isLeaderboard = location.pathname === '/leaderboard'
    let nav = isMobile ? <MobileNav /> : !isLeaderboard ? <MainNav /> : <div></div>

    return (
        <div>
                {nav}
            {!isLeaderboard && <BartabNav />}
            {/* <div className="fixed bottom-0 left-0 right-0 bg-slate-100/90 pt-16 z-50 backdrop-blur-md border-solid border-t-2 border-gray-500"></div> */}
            <div className={`App overflow-hidden  bg-cover bg-center bg-fixed bg-no-repeat bg-top ${!isMobile && !isLeaderboard ? 'mt-20' : ''}`} style={{backgroundImage: `url(${backgroundImage2})`}}>
                <div className="min-h-screen ">
                    <div className={`main-container ${isLeaderboard ? 'm-0 p-0' : 'm-5' }`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLayout