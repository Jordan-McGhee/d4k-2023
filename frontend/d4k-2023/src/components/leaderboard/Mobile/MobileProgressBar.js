import React from "react";

const MobileProgressBar = props => {

    const currentTotal = props.total
    const goal = 2000
    const percentage = Math.floor((currentTotal / goal) * 100)

    return (
        <div className="mb-4">
            <p className="text-center font-bold text-4xl text-white">Goal: $2000</p>

            {/* div for progress bar container */}
            <div className="bg-green-300 h-[15px] w-full rounded-2xl my-4">
                
                {/* div for progress bar */}
                <div className={ 'progress-bar rounded-2xl h-full'} style = {{ width: `${percentage}%`}}>
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