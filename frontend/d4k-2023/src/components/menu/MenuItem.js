import React from "react";
import { Button } from "@nextui-org/react";
import Card from "../../components/UIElements/Card";
import { useNavigate, createSearchParams } from "react-router-dom";

const MenuItem = props => {

    const navigate = useNavigate()

    const orderButtonPressed = (event) => {
        navigate({
            pathname: '/order', 
            search: createSearchParams({drinkId: props.id}).toString()
        })
    }

    return (
                <Card className = "flex px-4 py-3 justify-between border border-b-1 border-slate-500 first:rounded-t-3xl last:rounded-b-3xl bg-white/80 backdrop-blur-lg w-full overflow-hidden shadow-lg ">
                    <img src = { props.image } alt = { `${ props.name }` } className = "border border-slate-500 shadow-lg h-40 w-1/3 rounded-xl" />

                    {/* div for full list item */}
                    <div className="w-7/12 flex flex-col justify-evenly">

                        {/* title/description/ingredients */}
                        <div className="">
                            <p className="text-green-600 uppercase font-bold text-md">{ props.name }</p>
                            <p className="text-xs italic">{ props.description }</p>
                            <p className="uppercase  font-light text-[11px] my-2">{ props.ingredients.join(" * ") }</p>
                        </div>

                        {/* div for order button and price */}
                        <div className="flex items-center justify-between">
                            <Button
                                type = "SUBMIT"
                                radius="full"
                                onPress={orderButtonPressed}
                                className = "font-fugaz tracking-widest	 bg-gradient-to-r from-emerald-800 to-emerald-400 shadow-lg hover:scale-105 font-bold text-slate-200 border-2 border-emerald-700">
                                    Order
                            </Button>
                            <span className="text-emerald-600 font-bungee text-xl">${ props.price }</span>
                        </div>

                    </div>
                </Card>
    )
}

export default MenuItem