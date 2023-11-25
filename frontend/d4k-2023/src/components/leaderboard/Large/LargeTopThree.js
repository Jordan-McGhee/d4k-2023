import React from "react";
import LargeTopThreeItem from "./LargeTopThreeItem";

const LargeTopThree = props => {
    let items = props.data.map((user, i) => (
        <LargeTopThreeItem
            id = {`large-leaderboard-topThree-${i}`}
            key = {`large-leaderboard-topThree-${i}`}
            username = { user.username }
            quantity = { user.quantity }
            total = { user.total }
            rank = { i + 1 }
        />
    ))

    return (
        <ul className="flex justify-center w-full my-12 bg-black/30 px-16 rounded-2xl">
            { items }
        </ul>
    )
}

export default LargeTopThree