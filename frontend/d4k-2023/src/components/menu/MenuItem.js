import React from "react";
import Button from "../../components/FormElements/Button";
import Card from "../../components/UIElements/Card";

const MenuItem = props => {

    return (
        <li className="max-height-48 flex">
            <Card
                className = "flex px-4 py-2 justify-between rounded-lg border border-gray-2 bg-white w-full overflow-hidden shadow-lg mt-5"
            >
                <image src = { `../../${props.image}` } className = "border border-black h-full w-4/12" />

                {/* div for full list item */}
                <div className="w-7/12 flex flex-col justify-center">

                    {/* div for title/description/ingredients */}
                    <div className="">
                        <p className="uppercase text-green-600 font-bold text-lg">{ props.name}</p>
                        <p className="text-sm">{ props.description}</p>
                        <p className="uppercase font-light text-xs my-2">{ props.ingredients.join(" * ")}</p>
                    </div>

                    {/* div for order button and price */}
                    <div className="flex items-center justify-between">
                        <Button
                            text = "ADD TO ORDER"
                        />

                        <p>{ props.price }</p>
                    </div>

                </div>
            </Card>
        </li>
    )
}

export default MenuItem