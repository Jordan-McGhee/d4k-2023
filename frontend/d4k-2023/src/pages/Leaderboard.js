import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Spinner } from "@nextui-org/react";

import MobileLeaderBoard from "../components/leaderboard/Mobile/MobileLeaderBoard";
import LargeLeaderBoard from "../components/leaderboard/Large/LargeLeaderBoard"
import MobileEmptyLeaderBoard from "../components/leaderboard/Mobile/MobileEmptyLeaderBoard";
import LargeEmptyLeaderBoard from "../components/leaderboard/Large/LargeEmptyLeaderBoard";
import ErrorModal from "../components/UIElements/ErrorModal";
import { OrderApi } from "../api/orderApi";

// Constants
const REFRESH_INTERVAL_MS = 300000; // 5 minutes
const LOCAL_STORAGE_KEY = 'userId';

const SPINNER_CONFIG = {
    color: "success",
    className: "fixed top-1/4",
    style: { left: 'calc(50% - 40px)', zIndex: 100 },
    classNames: {
        wrapper: "w-20 h-20",
        circle1: "border-5",
        circle2: "border-5"
    }
};

const Leaderboard = () => {
    // API hooks
    const { isLoadingOrderApi, hasError, clearError, getOrdersLeaderboard } = OrderApi()

    // State management
    const [leaderboardData, setLeaderboardData] = useState({
        topUsers: [],
        total: null,
        userRank: null,
        partyMetrics: null
    })
    const [storedUserID, setStoredUserID] = useState(null)

    // Computed values
    const hasData = useMemo(() => 
        leaderboardData.total !== null && leaderboardData.partyMetrics !== null,
        [leaderboardData.total, leaderboardData.partyMetrics]
    )

    const showEmptyState = useMemo(() => 
        leaderboardData.topUsers.length === 0 && hasData && !isLoadingOrderApi,
        [leaderboardData.topUsers.length, hasData, isLoadingOrderApi]
    )

    // check for local storage user id
    useEffect(() => {
        const storedID = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedID) {
            setStoredUserID(parseInt(storedID, 10));
        }
    }, []);

    // Fetch leaderboard data
    const fetchLeaderboardData = useCallback(async () => {
        if (storedUserID === null) return;
        
        try {
            const data = await getOrdersLeaderboard(storedUserID);
            setLeaderboardData({
                topUsers: data.topUsers || [],
                total: data.sumTotal,
                userRank: data.userRank,
                partyMetrics: [data.totalUsers, data.drinkQuantity, data.shotQuantity]
            });
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
        }
    }, [storedUserID, getOrdersLeaderboard]);

    // Initial data fetch
    useEffect(() => {
        fetchLeaderboardData();
    }, [fetchLeaderboardData]);

    // Auto-refresh leaderboard data
    useEffect(() => {
        const intervalId = setInterval(fetchLeaderboardData, REFRESH_INTERVAL_MS);
        return () => clearInterval(intervalId);
    }, [fetchLeaderboardData]);


    return (
        <>
            <ErrorModal error={hasError} onClear={clearError} />
            
            {isLoadingOrderApi ? (
                <Spinner {...SPINNER_CONFIG} />
            ) : showEmptyState ? (
                <>
                    <div className="lg:hidden">
                        <MobileEmptyLeaderBoard />
                    </div>
                    <div className="hidden lg:block">
                        <LargeEmptyLeaderBoard />
                    </div>
                </>
            ) : hasData ? (
                <>
                    <div className="lg:hidden">
                        <MobileLeaderBoard 
                            topUsers={leaderboardData.topUsers} 
                            user={leaderboardData.userRank} 
                            total={leaderboardData.total} 
                            partyMetrics={leaderboardData.partyMetrics} 
                        />
                    </div>
                    <div className="hidden lg:block">
                        <LargeLeaderBoard 
                            data={leaderboardData.topUsers} 
                            total={leaderboardData.total} 
                        />
                    </div>
                </>
            ) : null}
        </>
    );
};

export default Leaderboard;