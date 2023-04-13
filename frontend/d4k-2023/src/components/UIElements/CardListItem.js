// import React, { useState } from "react"

const CardListItem = (props) => {

    // const [ showingMore, setShowingMore ] = useState(false)

    return (
        <li className="my-4">
            <p className="uppercase text-xl font-bold mb-2 border-b-2 pb-2 w-fit">{ props.question }</p>
            <p className= "text-lg">{ props.response }</p>

            {
                props.link &&
                <p className= "text-lg mt-2"> {props.linkText} </p>
            }
        </li>
    )
}

export default CardListItem