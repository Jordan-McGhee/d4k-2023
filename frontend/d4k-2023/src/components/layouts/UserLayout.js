import React from "react";
import MainNav from "../../navigation/MainNav";
import MobileNav from "../../navigation/MobileNav";
import BartabNav from "../../navigation/BartabNav";
import backgroundImage2 from "../../images/bgmobile2.jpg"
import { Outlet } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { useLocation } from 'react-router-dom'

const UserLayout = () => {
    
    const location = useLocation()
    const isLeaderboard = location.pathname === '/leaderboard'
    let nav = isMobile ? <MobileNav /> : !isLeaderboard ? <MainNav /> : <div></div>

    return (
        <div>
            {nav}
            {<BartabNav />}
            <div className={`App overflow-hidden  bg-cover bg-center bg-fixed bg-no-repeat bg-top ${!isMobile && !isLeaderboard ? /* mt-20 */'' : ''}`} style={{background: '#111F38'}}>
                <div className="min-h-screen ">
                    <div className={`main-container ${isLeaderboard ? 'm-0 p-0' : 'p-5' }`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLayout