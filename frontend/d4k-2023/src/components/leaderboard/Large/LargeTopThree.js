import React from "react";
import LargeTopThreeItem from "./LargeTopThreeItem";

const LargeTopThree = props => {
    let items = props.data.map((user) => (
        <LargeTopThreeItem
            id = {`large-leaderboard-topThree-${props.data.indexOf(user)}`}
            key = {`large-leaderboard-topThree-${props.data.indexOf(user)}`}
            username = { user.username }
            orderTotal = { user.orders_total ? parseInt(user.orders_total) : 0 }
            donationTotal = { user.donations_total ? parseInt(user.donations_total) : 0}
            drinksOrdered = { user.drinks_ordered ? user.drinks_ordered : 0}
            rank = { props.data.indexOf(user) + 1}
        />
    ))

    return (
        <ul className="flex justify-center w-full h-3/5 my-12 bg-black/30 p-12 rounded-2xl border-[16px] border-green-700">
            { items }
        </ul>
    )
}

export default LargeTopThree