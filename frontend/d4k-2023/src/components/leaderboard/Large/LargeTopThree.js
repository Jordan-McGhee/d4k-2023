import React from "react";
import LargeTopThreeItem from "./LargeTopThreeItem";

const LargeTopThree = props => {
    let items = props.data.map((user) => (
        <LargeTopThreeItem
            id = {`large-leaderboard-topThree-${props.data.indexOf(user)}`}
            key = {`large-leaderboard-topThree-${props.data.indexOf(user)}`}
            username = { user.username }
            total = {  user.donations_total ? parseInt(user.orders_total) + parseInt(user.donations_total) : parseInt(user.orders_total) }
            drinksOrdered = { user.drinks_ordered }
            rank = { props.data.indexOf(user) + 1}
        />
    ))

    return (
        <ul className="flex my-autow-full h-3/5 border border-black">
            { items }
        </ul>
    )
}

export default LargeTopThree