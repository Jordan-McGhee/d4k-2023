import React from "react";

const MobileProgressBar = props => {

    const currentTotal = props.total
    const goal = 2000
    const percentage = Math.floor((currentTotal / goal) * 100)
    const percentageRoundedDown = percentage - (percentage % 5)

    const percentageVariations = {
        0: "h-full w-[0%] rounded-2xl progress-bar",
        5: "h-full w-[5%] rounded-2xl progress-bar",
        10: "h-full w-[10%] rounded-2xl progress-bar",
        15: "h-full w-[15%] rounded-2xl progress-bar",
        20: "h-full w-[20%] rounded-2xl progress-bar",
        25: "h-full w-[25%] rounded-2xl progress-bar",
        30: "h-full w-[30%] rounded-2xl progress-bar",
        35: "h-full w-[35%] rounded-2xl progress-bar",
        40: "h-full w-[40%] rounded-2xl progress-bar",
        45: "h-full w-[45%] rounded-2xl progress-bar",
        50: "h-full w-[50%] rounded-2xl progress-bar",
        55: "h-full w-[55%] rounded-2xl progress-bar",
        60: "h-full w-[60%] rounded-2xl progress-bar",
        65: "h-full w-[65%] rounded-2xl progress-bar",
        70: "h-full w-[70%] rounded-2xl progress-bar",
        75: "h-full w-[75%] rounded-2xl progress-bar",
        80: "h-full w-[80%] rounded-2xl progress-bar",
        85: "h-full w-[85%] rounded-2xl progress-bar",
        90: "h-full w-[90%] rounded-2xl progress-bar",
        95: "h-full w-[95%] rounded-2xl progress-bar",
        100: "h-full w-[100%] rounded-2xl progress-bar"
    }

    return (
        <div className="mb-4">
            <p className="text-center font-bold text-4xl text-white">Goal: $2000</p>

            {/* div for progress bar container */}
            <div className="bg-green-300 h-[15px] w-full rounded-2xl my-4">
                
                {/* div for progress bar */}
                <div className={percentageRoundedDown > 100 ? percentageVariations[100] : percentageVariations[percentageRoundedDown]}>
                </div>
            </div>

            <p
                className="bg-white my-2 py-1 px-2 text-lg font-semibold text-green-700 text-center w-fit m-auto rounded-md"
            >
                ${currentTotal} — {percentage}%
            </p>
        </div>
    )

}

export default MobileProgressBar