import React from "react";
import LargeLeaderBoardItem from "./LargeLeaderBoardItem";

const LargeLeaderBoardList = props => {
    let items = props.data.map((user) => (
        <LargeLeaderBoardItem
            id = { `large-leaderboard-${props.data.indexOf(user)}`}
            key = { `large-leaderboard-${props.data.indexOf(user)}`}
            username = { user.username }
            total = { user.donations_total ? parseInt(user.orders_total) + parseInt(user.donations_total) : parseInt(user.orders_total)}
            donated = { user.donations_total ? user.donations_total : 0 }
            drinksOrdered = { user.drinks_ordered}
            rank = { props.data.indexOf(user) + 4}
        />
    ))

    return (
        <ul className="flex flex-col justify-center">
            <p className="text-center uppercase text-white font-bold text-6xl italic mb-12">In the running</p>
            { items }
        </ul>
    )
}

export default LargeLeaderBoardList