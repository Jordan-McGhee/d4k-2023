import React from "react";

const LargeProgressBar = props => {
    const currentTotal = props.total
    const goal = 2500
    const percentage = Math.floor((currentTotal / goal) * 100)

    return (
        <React.Fragment>
            <div className="flex justify-center h-full pl-20">
                <span className="text-3xl text-white bg-slate-400  px-4 py-2 rounded-full text-center font-bold align-bottom absolute top-10">
                    Goal ${goal}
                </span>
                <div className="bg-slate-400/80 border-4 w-[120px] rounded-full my-4 flex items-end">
                    <div className={`flex-1 progress-bar rounded-full text-3xl font-semibold text-green-600 text-center bg-cover 
                ${currentTotal >= goal ? 'gold' : ''}`}
                        style={{ height: `${percentage <= 100 ? percentage : 100}%` }}>
                        <div className="mt-16 border-2 py-2 bg-slate-100/90">
                            ${currentTotal} <br /> ({percentage}%)
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LargeProgressBar