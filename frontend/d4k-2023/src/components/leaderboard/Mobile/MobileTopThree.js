import React from "react";
import MobileTopThreeItem from "./MobileTopThreeItem";

const MobileTopThree = props => {
    let items = props.data.map((user, i) => (
        <MobileTopThreeItem
            id = { `mobile-leaderboard-topThree-${i}`}
            key = { `mobile-leaderboard-topThree-${i}`}
            username = { user.username }
            quantity = { user.quantity }
            total = { user.amount_paid + user.adjusted_donations}
            rank = { i + 1}
            userID = { user.user_id }
            userIDClass = { props.user === user.user_id ? props.userClass : null}
        />
    ))

    return (
        <ul>
            { items }
        </ul>
    )
}

export default MobileTopThree