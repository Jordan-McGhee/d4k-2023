import React, { useState, useEffect, useCallback } from "react";
import MobileEmptyLeaderBoard from "../components/leaderboard/Mobile/MobileEmptyLeaderBoard";
import MobileLeaderBoard from "../components/leaderboard/Mobile/MobileLeaderBoard";
import LargeLeaderBoard from "../components/leaderboard/Large/LargeLeaderBoard"
import ErrorModal from "../components/UIElements/ErrorModal";
import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import { useFetch } from "../hooks/useFetch";
import { isMobile } from 'react-device-detect';
import { OrderApi } from "../api/orderApi";

const LeaderBoard = () => {


    return (
        <>
            {
                
                <div className="lg:hidden">
                    <MobileLeaderBoard />
                </div>
            }

            {
            <div className="hidden lg:block">
                <LargeLeaderBoard />
            </div>}
        </>
    )
}

export default LeaderBoard