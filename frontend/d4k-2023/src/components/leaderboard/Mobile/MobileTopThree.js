import React from "react";
import MobileTopThreeItem from "./MobileTopThreeItem";

const MobileTopThree = props => {
    let items = props.data.map((user) => (
        <MobileTopThreeItem
            id = { `mobile-leaderboard-topThree-${props.data.indexOf(user)}`}
            key = { `mobile-leaderboard-topThree-${props.data.indexOf(user)}`}
            username = { user.username }
            quantity = { user.quantity }
            total = { user.amount_paid + user.adjusted_donations}
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