import React from "react";

const userTab = props => {

    const username = props.username

    return (
        <p className="rounded-full bg-green-700 text-white text-xl font-bold w-16 uppercase text-center py-4 z-10">{ username[0] }</p>
    )
}

export default userTab