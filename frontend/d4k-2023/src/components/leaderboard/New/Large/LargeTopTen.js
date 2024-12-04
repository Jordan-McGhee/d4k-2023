import React from "react";

// ui elements
import Card from "../../../UIElements/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faGlassMartini, faGlassWhiskey } from "@fortawesome/free-solid-svg-icons";

const TopTenItem = props => {

    return (
        <div className="rounded-3xl bg-slate-100/50 shadow-xl border-emerald-600 w-[45%] h-36 grid grid-cols-9 items-center">

            {/* image & rank */}
            <div className="flex items-baseline col-span-2">
                {
                    props.photoUrl ?
                        <img src={props.photoUrl} alt={`${props.username} Rank ${props.rank}`} />
                        :
                        <FontAwesomeIcon className="pt-2 text-gray-600 size-20 object-contain" icon={faUserAlt} />
                }
                <p className="bg-white rounded-full w-fit h-fit p-2 text-5xl font-bold">{props.rank}</p>
            </div>

            {/* username & drink count */}
            <div className="col-span-5 flex flex-col gap-y-4">
                <p className="text-5xl font-bold">{props.username}</p>

                <div className="flex gap-x-4">
                    {/* drink count */}
                    <div className="flex items-center">
                        <FontAwesomeIcon className="mr-2 h-8 text-slate-800" icon={faGlassMartini} />
                        <p className="text-4xl text-emerald-600 italic">{props.drink_quantity}</p>
                    </div>

                    {/* shot count */}
                    <div className="flex items-center">
                        <FontAwesomeIcon className="mr-2 h-8 text-slate-800" icon={faGlassWhiskey} />
                        <p className="text-4xl text-emerald-600 italic">{props.shot_quantity}</p>
                    </div>
                </div>


            </div>


            {/* amount spent/donated */}
            <p className="col-span-2 text-6xl font-bold italic text-emerald-600">${props.total}</p>
        </div >
    )
}

const LargeTopTen = props => {

    return (
        <div className="bg-white/20 w-full h-1/2 p-8">

            {/* 4 through 10 */}
            {
                props.users.length !== 0 &&
                <div className="flex flex-wrap items-center flex-1 gap-4">
                    {
                        props.users.map((user, i) => (
                            <TopTenItem
                                id={`large-leaderboard-topThree-${i}`}
                                key={`large-leaderboard-topThree-${i}`}
                                username={user.username}
                                drink_quantity={user.drink_quantity}
                                shot_quantity={user.shot_quantity}
                                total={user.amount_paid + user.adjusted_donations}
                                rank={i + 4}
                                photoUrl={user.photo_url}
                            />
                        ))
                    }
                </div>}

            {/* totals */}
            <div className="flex gap-x-8 w-fit">
                <div className="flex items-center gap-x-4">
                    <FontAwesomeIcon className="h-12 text-slate-800" icon={faUserAlt} />
                    <p className="text-4xl text-slate-800">91</p>
                </div>

                <div className="flex items-center gap-x-4">
                    <FontAwesomeIcon className="h-12 text-slate-800" icon={faGlassMartini} />
                    <p className="text-4xl text-slate-800">{props.drink_quantity}</p>
                </div>

                <div className="flex items-center gap-x-4">
                    <FontAwesomeIcon className="h-12 text-slate-800" icon={faGlassWhiskey} />
                    <p className="text-4xl text-slate-800">{props.shot_quantity}</p>
                </div>
            </div>

        </div>
    )
}

export default LargeTopTen