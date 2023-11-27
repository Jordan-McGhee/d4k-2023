import React from "react";
import MobileLeaderBoardItem from "./MobileLeaderBoardItem";

const MobileLeaderBoardList = props => {
    let items = props.data.map((user, i) => (
        <MobileLeaderBoardItem
            id = { `mobile-leaderboard-${i}`}
            key = { `mobile-leaderboard-${i}`}
            username = { user.username }
            quantity = { user.quantity }
            total = { user.amount_paid + user.adjusted_donations}
            rank = { i + 4}
            userID = { user.user_id }
            userIDClass = { props.user === user.user_id ? props.userClass : null }
        />
    ))

    return (
        <ul className="flex flex-col justify-center">
            { items }
        </ul>
    )
}

export default MobileLeaderBoardList