import React from "react";
import MobileLeaderBoardItem from "./MobileLeaderBoardItem";

const MobileLeaderBoardList = props => {

    console.log(props.user.rank)

    let items = props.topUsers.map((user, i) => (
        <MobileLeaderBoardItem
            id={`mobile-leaderboard-${i}`}
            key={`mobile-leaderboard-${i}`}
            username={user.username}
            drink_quantity={user.drink_quantity}
            shot_quantity={user.shot_quantity}
            photoUrl={user.photo_url}
            total={user.amount_paid + user.adjusted_donations}
            rank={i + 1}
            userID={user.user_id}
            userIDClass={props.user === user.user_id ? props.userClass : null}
        />
    ))

    return (
        <ul className="flex flex-col justify-center">
            {items}

            
            {
                +props.user.rank > 10 &&
                <MobileLeaderBoardItem
                    id={`mobile-leaderboard-${props.user.rank}`}
                    key={`mobile-leaderboard-${props.user.rank}`}
                    username={props.user.username}
                    drink_quantity={props.user.drink_quantity}
                    shot_quantity={props.user.shot_quantity}
                    photoUrl={props.user.photo_url}
                    total={props.user.amount_paid + props.user.adjusted_donations}
                    rank={+props.user.rank}
                    userID={props.user.user_id}
                    userIDClass={props.userClass}
                    drinkClass={"text-white text-sm italic font-bold"}
                />
            }
        </ul>
    )
}

export default MobileLeaderBoardList