import React from "react";
import MobileTopThreeItem from "./MobileTopThreeItem";

const MobileTopThree = props => {
    let items = props.data.map((user) => (
        <MobileTopThreeItem
            id = { `mobile-leaderboard-topThree-${props.data.indexOf(user)}`}
            key = { `mobile-leaderboard-topThree-${props.data.indexOf(user)}`}
            username = { user.username }
            total = { user.total }
            drinksOrdered = { user.drinks_ordered}
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