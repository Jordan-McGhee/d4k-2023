import React, { useState } from "react";
import Card from "../UIElements/Card";

const QueueItem = (props) => {
    
    const [ showMore, setShowMore ] = useState(false)

    let allDrinks = props.drinks.map((drink) => (
        <li className="list-disc ml-5">
            { drink.name }
        </li>
    ))
    
    return (
        <li>
            <Card className = "flex flex-col p-6 rounded-lg border border-gray-2 bg-white w-full shadow-lg my-5" >

                {/* container div for whole card */}
                <div>

                    {/* div for section of card that's always shown */}
                    <div className="flex justify-between">

                        <p className="self-center text-4xl">{ props.spotInQueue }</p>

                        {/* div for name, # of drinks, and dropdown arrow */}
                        <div className="w-10/12 flex justify-between items-center">

                            <div className="">
                                <p className="text-xl font-semibold">{ props.name }</p>
                                <p>{ props.drinks.length > 1 ? `${ props.drinks.length } drinks` : "1 drink"  }</p>
                            </div>

                            <img
                                src="../images/drop-down-arrow.png"
                                onClick= { () => { setShowMore(!showMore)} }
                            />
                        </div>

                    </div>

                    {/* ul for extras (shows all drinks in order) */}

                    { showMore && 
                        <ul className="pt-4">
                            { allDrinks }
                        </ul>
                    }

                </div>

            </Card>
        </li>
    )
}

export default QueueItem