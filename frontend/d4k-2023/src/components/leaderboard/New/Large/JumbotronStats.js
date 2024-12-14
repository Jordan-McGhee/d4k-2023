import React, { useState, useEffect } from "react";

// ui imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faGlassMartini, faGlassWhiskey, faGlassCheers, faMoneyBill, faMoneyBill1, faMoneyBill1Wave, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

const ShotCard = props => {

    const naughty = props.shotCount.filter((drink) => drink.drink === "naughty shot")[0]
    const nice = props.shotCount.filter((drink) => drink.drink === "nice shot")[0]

    let maxShotCount, minShotCount, percentage

    if (naughty && nice) {
        maxShotCount = Math.max(naughty.total_orders, nice.total_orders)
        minShotCount = Math.min(naughty.total_orders, nice.total_orders)
        percentage = +((minShotCount / maxShotCount) * 100).toFixed(0)
    }

    return (
        <div className="w-full">
            {/* title */}
            <div className="flex items-center justify-center gap-x-4 mb-4">
                <FontAwesomeIcon className="h-12 text-emerald-600" icon={faGlassWhiskey} />
                <p className="text-5xl font-bold text-emerald-600 uppercase">Shot Count</p>
            </div>

            {/* content */}
            <div className="bg-slate-100/60 p-8 w-full rounded-2xl">

                {
                    naughty || nice ?

                        <>
                            {
                                naughty.total_orders >= nice.total_orders ?
                                    <>
                                        <div className="w-full grid grid-cols-7 items-center gap-x-4 mb-4">
                                            <p className="col-span-2 uppercase text-2xl font-bold text-rose-600">Naughty</p>

                                            {/* bar graph */}
                                            <div
                                                className="h-8 col-span-4 bg-rose-600"
                                                style={{ width: '100%' }}
                                            />

                                            <p className="text-4xl col-span-1 text-rose-600 font-black">{naughty.total_orders}</p>
                                        </div>

                                        <div className="w-full grid grid-cols-7 items-center gap-x-4">
                                            <p className="col-span-2 uppercase text-2xl font-bold text-emerald-600">Nice</p>

                                            {/* bar graph */}
                                            <div className="h-8 col-span-4 bg-emerald-600" style={{ width: `${percentage}%` }} />

                                            <p className="text-4xl col-span-1 text-emerald-600 font-black">{nice.total_orders || 0}</p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="w-full grid grid-cols-7 items-center gap-x-4 mb-4">
                                            <p className="col-span-2 uppercase text-2xl font-bold text-emerald-600">nice</p>

                                            {/* bar graph */}
                                            <div
                                                className="h-8 col-span-4 bg-emerald-600"
                                                style={{ width: '100%' }}
                                            />

                                            <p className="text-4xl col-span-1 text-emerald-600 font-black">{nice.total_orders || 0}</p>
                                        </div>

                                        <div className="w-full grid grid-cols-7 items-center gap-x-4">
                                            <p className="col-span-2 uppercase text-2xl font-bold text-rose-600">naughty</p>

                                            {/* bar graph */}
                                            <div className="h-8 col-span-4 bg-rose-600" style={{ width: `${percentage}%` }} />

                                            <p className="text-4xl col-span-1 text-rose-600 font-black">{naughty.total_orders || 0}</p>
                                        </div>
                                    </>
                            }
                        </>
                        :

                        <>
                            <p className="text-center text-4xl font-bold py-8">No shots ordered yet!</p>
                        </>
                }

            </div>
        </div>
    )
}

const StatCarousel = props => {

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                (prevIndex + 1) % 2
            );
        }, 30000); // 30 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const titles = [
        "Top Drinks",
        "Popular Spirits",
        // "Favorite Mixers"
    ]

    // content to loop over depending on current index
    const content = [
        {
            data: props.drinkCount.slice(0, 5),
            name: "drink",
            iterator: "total_orders"
        },
        {
            data: props.popularSpirits.slice(0, 5),
            name: "name",
            iterator: "ingredient_totals_ml"
        },
        // {
        //     data: props.popularIngredients.slice(0, 5),
        //     name: "name",
        //     iterator: "ingredient_totals_ml"
        // }
    ]


    return (
        <div className="w-full">
            {/* title */}
            <p className="text-5xl font-bold text-emerald-600 uppercase text-center mb-4">{titles[currentIndex]}</p>

            {/* ranking */}
            <ul className="bg-slate-100/60 p-8 w-full flex flex-col gap-y-8 rounded-2xl">
                {
                    content[currentIndex].data.map((item, i) => (
                        <li className="grid grid-cols-7 items-center" key={`${item.name}, Rank: ${i + 1}`}>

                            {/* rank */}
                            <div className={`text-white bg-emerald-600 rounded-full p-4 col-span-1`}>
                                <p className="text-3xl text-center font-black italic">{i + 1}</p>
                            </div>

                            {/* name/description */}
                            <div className="col-span-4 pl-4">
                                <p className="text-3xl font-bold capitalize text-nowrap">{item[content[currentIndex].name]}</p>
                            </div>

                            {/* total */}

                            {
                                content[currentIndex].iterator === "total_orders" ?

                                    // case for total orders
                                    <p className="text-4xl col-span-2 text-right font-black text-emerald-600">
                                        {item[content[currentIndex].iterator]}
                                    </p>
                                    :

                                    // case for milliliters
                                    <p className="text-4xl col-span-2 text-right font-black text-emerald-600">
                                        {(item[content[currentIndex].iterator] / 1000).toFixed(1)} L
                                    </p>
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

const LastYearStats = () => {

    return (
        <div className=" w-full">
            {/* title */}
            <div className="flex items-center justify-center gap-x-4 mb-4">
                <FontAwesomeIcon className="h-12 text-emerald-600" icon={faGlassCheers} />
                <p className="text-5xl font-bold text-emerald-600 uppercase">2023 D4K Stats</p>
            </div>

            <div className="bg-slate-100/60 p-8 w-full flex flex-wrap justify-between gap-4 rounded-2xl">

                {/* last year total */}
                <div className="grid grid-cols-3 items-center w-[48%]">
                    <div className="col-span-1 flex justify-center items-center">
                        <FontAwesomeIcon icon={faMoneyBill1Wave} className="size-12 object-contain text-emerald-600" />
                    </div>
                    <div className="col-span-2 flex flex-col items-center justify-center">
                        <p className="text-emerald-600 text-4xl font-black">$5636</p>
                        <p className="italic -mt-1 text-xl">Money Raised</p>
                    </div>
                </div>

                {/* last year guests */}
                <div className="grid grid-cols-3 items-center w-[48%]">
                    <div className="col-span-1 flex justify-center items-center">
                        <FontAwesomeIcon icon={faUserAlt} className="size-12 object-contain text-emerald-600" />
                    </div>
                    <div className="col-span-2 flex flex-col items-center justify-center">
                        <p className="text-emerald-600 text-4xl font-black">90</p>
                        <p className="italic -mt-1 text-xl">Guests</p>
                    </div>
                </div>

                {/* last year drinks ordered */}
                <div className="grid grid-cols-3 items-center w-[48%]">
                    <div className="col-span-1 flex justify-center items-center">
                        <FontAwesomeIcon icon={faGlassMartini} className="size-12 object-contain text-emerald-600" />
                    </div>
                    <div className="col-span-2 flex flex-col items-center justify-center">
                        <p className="text-emerald-600 text-4xl font-black">275</p>
                        <p className="italic -mt-1 text-xl">Drinks Made</p>
                    </div>
                </div>

                {/* last year shots ordered */}
                <div className="grid grid-cols-3 items-center w-[48%]">
                    <div className="col-span-1 flex justify-center items-center">
                        <FontAwesomeIcon icon={faGlassWhiskey} className="size-12 object-contain text-emerald-600" />
                    </div>
                    <div className="col-span-2 flex flex-col items-center justify-center">
                        <p className="text-emerald-600 text-4xl font-black">134</p>
                        <p className="italic -mt-1 text-xl">Shots Made</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const JumbotronStats = props => {



    return (
        <div className={"flex flex-col gap-y-20 items-center mt-6 mr-24 w-[20%]"}>

            <ShotCard shotCount={props.shotCount} />

            <StatCarousel
                drinkCount={props.drinkCount}
                popularSpirits={props.ingredientCount.filter((spirit) => spirit.type === "liquor")}
                popularIngredients={props.ingredientCount.filter((spirit) => spirit.type !== "liquor")}
            />

            <LastYearStats />
        </div>
    )
}

export default JumbotronStats