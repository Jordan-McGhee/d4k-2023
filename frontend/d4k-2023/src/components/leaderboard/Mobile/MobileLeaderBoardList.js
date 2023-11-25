import React from "react";
import MobileLeaderBoardItem from "./MobileLeaderBoardItem";

const MobileLeaderBoardList = props => {
    let items = props.data.map((user) => (
        <MobileLeaderBoardItem
            id = { `mobile-leaderboard-${props.data.indexOf(user)}`}
            key = { `mobile-leaderboard-${props.data.indexOf(user)}`}
            username = { user.username }
            quantity = { user.quantity }
            total = { user.amount_paid + user.adjusted_donations}
            rank = { props.data.indexOf(user) + 4}
        />
    ))

    return (
        <ul>
            { items }
        </ul>
    )
}

export default MobileLeaderBoardList