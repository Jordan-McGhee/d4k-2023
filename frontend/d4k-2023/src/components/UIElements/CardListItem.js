import React, { useState } from "react"

const CardListItem = (props) => {

    const [ showingMore, setShowingMore ] = useState(false)

    return (
        <li className="mt-4">
            <p className="uppercase text-2xl">{ props.question }</p>
            <p className= {"uppercase" + props.responseClass || "text-md"}>{ props.response }</p>
        </li>
    )
}

export default CardListItem