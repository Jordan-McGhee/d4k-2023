import React from "react";
import MobileLeaderBoardItem from "./MobileLeaderBoardItem";

const MobileLeaderBoardList = props => {
    let items = props.data.map((user) => (
        <MobileLeaderBoardItem
            id = { `mobile-leaderboard-${props.data.indexOf(user)}`}
            key = { `mobile-leaderboard-${props.data.indexOf(user)}`}
            username = { user.username }
            donationTotal = { user.donations_total ? parseInt(user.donations_total) : 0}
            orderTotal = { user.orders_total ? parseInt(user.orders_total) : 0 }
            drinksOrdered = { user.drinks_ordered ? user.drinks_ordered : 0}
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