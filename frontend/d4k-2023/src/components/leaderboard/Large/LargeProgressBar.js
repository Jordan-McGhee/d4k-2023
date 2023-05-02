import React from "react";

const LargeProgressBar = props => {
    const currentTotal = props.total
    const goal = 2000
    const percentage = Math.floor((currentTotal / goal) * 100)

    return (
        // <div className="h-screen flex flex-col items-center justify-center">
            
        //     <p className="text-center font-bold text-5xl text-white">Goal: $2000</p>

        //     {/* div for progress bar container */}

        //     {/* TOTALS */}
        //     <p
        //         className="bg-white p-4 text-6xl font-extrabold text-green-700 text-center w-fit my-12 rounded-md"
        //     >
        //         ${currentTotal} — {percentage}%
        //     </p>

        //     <div className="bg-green-300 h-4/5 w-[100px] rounded-full
        //     rotate-180 my-4">
                
        //         {/* div for progress bar */}
        //         <div className={ 'progress-bar rounded-full'} style = {{height: `${percentage}%`}}>
        //         </div>

        //     </div>
        // </div>

        <div className="flex items-center justify-around mt-24">
            <p className="text-8xl text-white text-center font-bold">Goal: $2000</p>

            {/* div for progress bar container */}
            <div className="bg-green-300 h-[120px] w-11/12 rounded-full mx-4">
                
                {/* div for progress bar */}
                <div className={ 'progress-bar rounded-full h-full'} style = {{ width: `${percentage}%`}}>
                </div>
            </div>

            <p
                className="bg-white p-4 leading-snug text-7xl font-semibold text-green-700 text-center w-fit ml-8 rounded-2xl"
            >
                ${currentTotal} — {percentage}%
            </p>
            
        </div>
    )
}

export default LargeProgressBar