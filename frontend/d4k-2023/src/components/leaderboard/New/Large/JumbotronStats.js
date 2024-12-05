import React from "react";

// ui imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faGlassMartini, faGlassWhiskey, faGlassCheers } from "@fortawesome/free-solid-svg-icons";

const ShotCard = props => {

    const naughty = props.shotCount.filter((drink) => drink.drink === "naughty shot")[0]
    const nice = props.shotCount.filter((drink) => drink.drink === "nice shot")[0]

    const maxShotCount = Math.max(naughty.total_orders, nice.total_orders)
    const minShotCount = Math.min(naughty.total_orders, nice.total_orders)
    const percentage = +((minShotCount / maxShotCount) * 100).toFixed(0)

    return (
        <div className="h-1/4">
            {/* title */}
            <div className="flex items-center justify-center gap-x-4 mb-4">
                <FontAwesomeIcon className="h-12 text-emerald-600" icon={faGlassWhiskey} />
                <p className="text-5xl font-bold text-emeraled-600 uppercase">Shot Tracker</p>
            </div>

            {/* content */}
            <div className="bg-slate-100/50 p-8 w-full rounded-2xl">
                {
                    naughty.total_orders >= nice.total_orders ?
                        <>
                            <div className="w-full grid grid-cols-7 items-center gap-x-4 mb-4">
                                <p className="col-span-2 uppercase text-2xl">Naughty</p>

                                {/* bar graph */}
                                <div className="w-full h-8 col-span-4 bg-rose-600" />

                                <p className="text-4xl col-span-1 text-rose-600 font-black">{naughty.total_orders}</p>
                            </div>

                            <div className="w-full grid grid-cols-7 items-center gap-x-4">
                                <p className="col-span-2 uppercase text-2xl">Nice</p>

                                {/* bar graph */}
                                <div className="h-8 col-span-4 bg-emerald-600" style={{ width: `${percentage}` }} />

                                <p className="text-4xl col-span-1 text-emerald-600 font-black">{nice.total_orders}</p>
                            </div>
                        </>
                        :
                        <>
                        </>
                }

            </div>
        </div>
    )
}

const StatCarousel = props => {

}

const LastYearStats = () => {

    return (
        <div className="h-1/4">
            {/* title */}
            <div className="flex items-center justify-center gap-x-4 mb-4">
                <FontAwesomeIcon className="h-12 text-emerald-600" icon={faGlassCheers} />
                <p className="text-5xl font-bold text-emeraled-600 uppercase">2023 D4K Stats</p>
            </div>

            <div className="bg-slate-100/50 p-8 w-full flex justify-between gap-x-6 rounded-2xl">

                {/* last year total */}
                <div className="flex flex-col items-center gap-y-2">
                    <p className="text-emerald-600 text-4xl font-black">$5636</p>
                    <p className="italic">Money Raised</p>
                </div>

                {/* last year guests */}
                <div className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faUserAlt} className="size-12 object-contain text-emerald-600" />
                    <div className="flex flex-col items-center gap-y-2">
                        <p className="text-emerald-600 text-4xl font-black">136?</p>
                        <p className="italic">Guests</p>
                    </div>
                </div>

                {/* last year drinks ordered */}
                <div className="flex items-center gap-x-4">
                    <FontAwesomeIcon icon={faGlassMartini} className="size-12 object-contain text-emerald-600" />
                    <div className="flex flex-col items-center gap-y-2">
                        <p className="text-emerald-600 text-4xl font-black">232?</p>
                        <p className="italic">Drinks Made</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const JumbotronStats = props => {

    return (
        <div className={"flex flex-col justify-between items-center w-full" + props.className}>

            <ShotCard shotCount={props.shotCount} />

            <StatCarousel />

            <LastYearStats />
        </div>
    )
}

export default JumbotronStats