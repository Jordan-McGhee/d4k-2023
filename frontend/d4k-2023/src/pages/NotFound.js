import React from "react";
import image from "../images/404NotFound.png"

const NotFound = () => {

    return (
        // <div className="" style={{ backgroundImage: {image}}}></div>
        <img src={ image } alt = "404 Not Found" className="object-fill"/>
    )
}

export default NotFound