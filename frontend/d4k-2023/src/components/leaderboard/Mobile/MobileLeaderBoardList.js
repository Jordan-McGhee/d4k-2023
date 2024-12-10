import React, { useState, useEffect } from "react";
import MobileLeaderBoardItem from "./MobileLeaderBoardItem";

const MobileLeaderBoardList = (props) => {
    const [userData, setUserData] = useState(null);

    // Update userData state when props.user changes
    useEffect(() => {
        if (props.user) {
            setUserData(props.user);
        }
    }, [props.user]);

    // class for user's item
    const userClass = 'bg-green-200 border-2 p-2 grid grid-cols-5 items-center border-b-2 w-full animate-pulse-custom first:rounded-t-3xl last:rounded-b-3xl'

    // Render leaderboard items
    let items = props.topUsers.map((user, i) => (
        <MobileLeaderBoardItem
            id={`mobile-leaderboard-${i}`}
            key={`mobile-leaderboard-${i}`}
            username={user.username}
            drink_quantity={user.drink_quantity}
            shot_quantity={user.shot_quantity}
            photoUrl={user.photo_url}
            total={user.amount_paid + user.adjusted_donations}
            rank={i + 1}
            userIDClass={props.user?.user_id === user.user_id ? userClass : null}
            drinkClass={props.user?.user_id === user.user_id ? "text-white" : null}
        />
    ));

    // Add the current user's info if their rank is outside the top 10
    if (userData?.rank && +userData.rank > 10) {
        items.push(
            <MobileLeaderBoardItem
                id={`mobile-leaderboard-${userData.rank}`}
                key={`mobile-leaderboard-${userData.rank}`}
                username={userData.username}
                drink_quantity={userData.drink_quantity}
                shot_quantity={userData.shot_quantity}
                photoUrl={userData.photo_url}
                total={userData.amount_paid + userData.adjusted_donations}
                rank={+userData.rank}
                userIDClass={props.userClass}
                drinkClass={"text-white"}
            />
        );
    }

    return <ul className="flex flex-col justify-center">{items}</ul>;
};

export default MobileLeaderBoardList;
