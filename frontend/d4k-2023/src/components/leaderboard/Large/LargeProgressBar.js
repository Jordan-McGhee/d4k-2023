import React from "react";

const LargeProgressBar = props => {
    const currentTotal = props.total
    const goal = 2000
    const percentage = Math.floor((currentTotal / goal) * 100)
    const percentageRoundedDown = percentage - (percentage % 10)

    const percentageVariations = {
        0: "h-[0%] rounded-full progress-bar",
        10: "h-[10%] rounded-full progress-bar",
        20: "h-[20%] rounded-full progress-bar",
        30: "h-[30%] rounded-full progress-bar",
        40: "h-[40%] rounded-full progress-bar",
        50: "h-[50%] rounded-full progress-bar",
        60: "h-[60%] rounded-full progress-bar",
        70: "h-[70%] rounded-full progress-bar",
        80: "h-[80%] rounded-full progress-bar",
        90: "h-[90%] rounded-full progress-bar",
        100: "h-[100%] rounded-full progress-bar"
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            
            <p className="text-center font-bold text-5xl text-white">Goal: $2000</p>

            {/* div for progress bar container */}

            {/* TOTALS */}
            <p
                className="bg-white p-4 text-6xl font-extrabold text-green-700 text-center w-fit my-12 rounded-md"
            >
                ${currentTotal} — {percentage}%
            </p>

            <div className="bg-green-300 h-4/5 w-[100px] rounded-full
            rotate-180 my-4">
                
                {/* div for progress bar */}
                <div className={ percentageRoundedDown > 100 ? percentageVariations[100] : percentageVariations[percentageRoundedDown]}>
                </div>

            </div>
        </div>
    )
}

export default LargeProgressBar