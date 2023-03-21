import React from "react";

const LargeProgressBar = props => {
    const currentTotal = props.total
    const goal = 2000
    const percentage = Math.floor((currentTotal / goal) * 100)
    const percentageRoundedDown = percentage - (percentage % 10)

    const percentageVariations = {
        0: "h-[0%] rounded-2xl progress-bar",
        10: "h-[10%] rounded-2xl progress-bar",
        20: "h-[20%] rounded-2xl progress-bar",
        30: "h-[30%] rounded-2xl progress-bar",
        40: "h-[40%] rounded-2xl progress-bar",
        50: "h-[50%] rounded-2xl progress-bar",
        60: "h-[60%] rounded-2xl progress-bar",
        70: "h-[70%] rounded-2xl progress-bar",
        80: "h-[80%] rounded-2xl progress-bar",
        90: "h-[90%] rounded-2xl progress-bar",
        100: "h-[100%] rounded-2xl progress-bar"
    }

    return (
        <div className="h-screen flex flex-col items-center">
            
            <p className="text-center font-bold text-4xl text-white">Goal: $2000</p>

            {/* div for progress bar container */}

            {/* TOTALS */}
            <p
                className="bg-white py-1 px-2 text-2xl font-extrabold text-green-700 text-center w-fit m-auto rounded-md"
            >
                ${currentTotal} — {percentage}%
            </p>

            <div className="bg-green-300 h-4/5 w-[35px] rounded-2xl
            rotate-180 my-4">
                
                {/* div for progress bar */}
                <div className={ percentageRoundedDown > 100 ? percentageVariations[100] : percentageVariations[percentageRoundedDown]}>
                </div>

            </div>
        </div>
    )
}

export default LargeProgressBar