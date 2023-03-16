import React from "react";
import MobileLeaderBoardItem from "./MobileLeaderBoardItem";

const MobileLeaderBoardList = props => {
    let items = props.data.map((user) => (
        <MobileLeaderBoardItem
            id = { `mobile-leaderboard-${props.data.indexOf(user)}`}
            key = { `mobile-leaderboard-${props.data.indexOf(user)}`}
            username = { user.username }
            total = { user.donations_total ? parseInt(user.orders_total) + parseInt(user.donations_total) : parseInt(user.orders_total)}
            donated = { user.total_donated }
            drinksOrdered = { user.drinks_ordered}
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