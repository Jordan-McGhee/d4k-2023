import React from "react";
import MobileTopThreeItem from "./MobileTopThreeItem";

const MobileTopThree = props => {
    let items = props.data.map((user) => (
        <MobileTopThreeItem
            id = { `mobile-leaderboard-topThree-${props.data.indexOf(user)}`}
            key = { `mobile-leaderboard-topThree-${props.data.indexOf(user)}`}
            username = { user.username }
            donationTotal = { user.donations_total ? parseInt(user.donations_total) : 0}
            orderTotal = { user.orders_total ? parseInt(user.orders_total) : 0 }
            // total = { user.donations_total ? parseInt(user.orders_total) + parseInt(user.donations_total) : parseInt(user.orders_total)}
            drinksOrdered = { user.drinks_ordered ? user.drinks_ordered : 0}
            rank = { props.data.indexOf(user) + 1}
        />
    ))

    return (
        <ul>
            { items }
        </ul>
    )
}

export default MobileTopThree