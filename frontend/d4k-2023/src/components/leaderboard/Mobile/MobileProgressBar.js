import React from "react";

const MobileProgressBar = props => {

    const currentTotal = props.total
    const goal = 2000
    const percentage = Math.floor((currentTotal / goal) * 100)

    return (
        <div className="mb-4">
            <p className="text-center font-bold text-3xl text-slate-200 font-fugaz">${goal} GOAL</p>
            <div className="text-xl text-right font-semibold text-emerald-500 rounded-full " style = {{ width: `${percentage}%`}} >
                {percentage}%
            </div>
            {/* div for progress bar container */}
            <div className="bg-emerald-300/60 h-[45px] w-full rounded-full mb-6 mt-2 shadow-xl border-2 border-slate-800">
                {/* div for progress bar */}
                <div className={'progress-bar rounded-full py-1 h-full'} style = {{ width: `${percentage}%`}}>
                    { percentage >= 20 && 
                    <div className="bg-white px-2 text-lg font-semibold text-emerald-600 text-center w-fit align-end rounded-full border-1 border-slate-400 float-right mr-2">
                        ${currentTotal}
                    </div>
                    }
                </div>
            </div>
        </div>
    )

}

export default MobileProgressBar