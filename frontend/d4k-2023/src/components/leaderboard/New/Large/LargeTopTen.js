import React from "react";

// ui elements
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faGlassMartini, faGlassWhiskey } from "@fortawesome/free-solid-svg-icons";

const TopTenItem = props => {

    return (
        <div className="rounded-full bg-slate-100 shadow-xl border-emerald-600 w-[45%] h-fit grid grid-cols-5 items-center px-6 py-3.5">

            {/* image & rank */}
            <div className="relative flex items-center col-span-1">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-emerald-600 shadow-lg">
                    {props.photoUrl ? (
                        <img
                            src={props.photoUrl}
                            alt={`${props.username} Rank ${props.rank}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <FontAwesomeIcon
                                className="text-gray-600 size-12"
                                icon={faUserAlt}
                            />
                        </div>
                    )}
                </div>

                {/* Rank circle - now outside the image container */}
                <div className="absolute -bottom-3 right-8 bg-emerald-600 text-white rounded-full w-12 h-12 flex items-center justify-center border-4 border-white shadow-lg text-2xl font-bold italic"
                >
                    {props.rank}
                </div>
            </div>

            {/* username & drink count */}
            <div className="col-span-3 flex flex-col gap-y-1">
                <p className="text-4xl font-bold truncate">{props.username}</p>

                <div className="flex gap-x-4">
                    {/* drink count */}
                    <div className="flex items-center">
                        <FontAwesomeIcon className="mr-2 h-8 text-slate-600" icon={faGlassMartini} />
                        <p className="text-3xl text-slate-600  italic font-bold">{props.drink_quantity} Drinks</p>
                    </div>

                    {/* shot count */}
                    <div className="flex items-center">
                        <FontAwesomeIcon className="mr-2 h-8 text-slate-600" icon={faGlassWhiskey} />
                        <p className="text-3xl text-slate-600 italic font-bold">{props.shot_quantity} Shots</p>
                    </div>
                </div>


            </div>


            {/* amount spent/donated */}
            <p className="col-span-1 text-5xl font-bold text-slate-800 text-right">${props.total}</p>
        </div >
    )
}

const LargeTopTen = props => {

    return (
        <div className=" w-full p-8">

            {/* 4 through 10 */}
            {
                props.users.length !== 0 &&
                <div className="flex flex-wrap justify-center items-center flex-1 gap-4">
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
            <div className="flex mx-auto gap-x-8 w-fit mt-8 pb-8">
                <div className="flex items-center gap-x-4">
                    <FontAwesomeIcon className="h-12 text-emerald-600" icon={faUserAlt} />
                    <p className="text-4xl text-emerald-600 font-black">{props.user_quantity}</p>
                </div>

                <div className="flex items-center gap-x-4">
                    <FontAwesomeIcon className="h-12 text-emerald-600" icon={faGlassMartini} />
                    <p className="text-4xl text-emerald-600 font-black">{props.drink_quantity}</p>
                </div>

                <div className="flex items-center gap-x-4">
                    <FontAwesomeIcon className="h-12 text-emerald-600" icon={faGlassWhiskey} />
                    <p className="text-4xl text-emerald-600 font-black">{props.shot_quantity}</p>
                </div>
            </div>

        </div>
    )
}

export default LargeTopTen