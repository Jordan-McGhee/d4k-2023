import React from "react";

const HonorableMentions = props => {

    let mentions = [
        `x total drinks ordered!`,
        `Most popular drink: _______ (ordered 63 times!)`,
        'Biggest Donator: _______ (Donated $150!)',
        `Most Drinks Ordered: Jordan (Someone take their keys)`
    ]

    return (
        <div className="flex flex-col items-center border-green-700 border-4 p-12 overflow-auto max-w-6xl mx-auto bg-white">
            <p className="font-bold text-8xl">Honorable Mentions</p>
            <p className="text-6xl mt-8 text-center">{ mentions[3] }</p>
        </div>
    )
}

export default HonorableMentions