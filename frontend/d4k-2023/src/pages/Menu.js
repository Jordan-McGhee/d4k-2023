import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";
import MenuList from "../components/menu/MenuList";
import MenuItem from "../components/menu/MenuItem";

import { MenuApi } from "../api/menuApi";
import { DrinkApi } from "../api/drinkApi";


const Menu = () => {
    const { getDrinksAdmin } = DrinkApi()

    // const { getCocktails, getBatched, getShots, getMocktails } = MenuApi()
    const [ cocktails, setCocktails] = useState([])
    const [ shots, setShots] = useState([])
    const [ batched, setBatched] = useState([])
    const [ mocktails, setMocktails] = useState([])

    useEffect(() => {
        const getMenu = async () => {
            try {
                const allDrinks = await getDrinksAdmin()
   
                setCocktails(allDrinks.filter(d=> d.type==="cocktail"))
                setShots(allDrinks.filter(d=> d.type==="shot"))
                setBatched(allDrinks.filter(d=> d.type==="batched"))
                setMocktails(allDrinks.filter(d=> d.type==="mocktail"))
            } catch (error) {
                console.log(error)
            }
        }
        getMenu()
    }, [ ])
    return (
        <div className="max-w-md m-auto">
            {/* div for buttons */}

            <div className="flex m-auto justify-between text-white fixed top-0 inset-x-0 px-1 py-4 w-full text-sm z-10 backdrop-blur-md bg-slate-500/80 max-w-md border-b-2 border-emerald-500">
                <Button
                    className="bg-emerald-600  rounded-l-3xl rounded-r-none border-r-0 focus:text-emerald-600 focus:bg-gray-300 hover:text-emerald-600 text-slate-100 text-lg font-fugaz"
                    variant="ghost"
                    onPress={() => document.getElementById('cocktails').scrollIntoView({ behavior: 'smooth' })}
                >Cocktails</Button>

                <Button
                    className="bg-emerald-600 rounded-none border-r-0 text-slate-100 focus:text-emerald-600 focus:bg-gray-300 hover:text-emerald-600 text-lg font-fugaz"
                    variant="ghost"
                    onClick={() => document.getElementById('batched').scrollIntoView({ behavior: 'smooth' })}
                >Batched</Button>

                <Button
                    className="bg-emerald-600 rounded-none border-r-0 text-slate-100 focus:text-emerald-600 focus:bg-gray-300 hover:text-emerald-600 text-lg font-fugaz"
                    variant="ghost"
                    onClick={() => document.getElementById('shots').scrollIntoView({ behavior: 'smooth' })}>
                    Shots
                </Button>
                <Button
                    className="bg-emerald-600 rounded-r-3xl rounded-l-none text-slate-100 focus:text-emerald-600 focus:bg-gray-300 hover:text-emerald-600 text-lg font-fugaz"
                    variant="ghost"
                    onClick={() => document.getElementById('mocktails').scrollIntoView({ behavior: 'smooth' })}>
                    Mocktails
                </Button>
            </div>

            {cocktails.length === 0 || shots.length === 0 || batched.length === 0 || mocktails.length === 0 ?
                <Spinner 
                    color="success"
                    className="fixed top-1/4"
                    style={{left:'calc(50% - 40px)', zIndex:100}}
                    classNames={{
                        wrapper: "w-20 h-20",
                        circle1: "border-5",
                        circle2: "border-5"
                    }} />
:
            <div className="mt-10 pt-10">
                {/* cocktails div */}
                <div id="cocktails" className="scroll-mt-24">
                    <p className="text-center text-4xl mt-4 text-emerald-500 font-extrabold font-fugaz">Cocktails</p>
                    <MenuList
                        drinks={cocktails}
                    />
                </div>

                {/* batched div */}
                <div id="batched" className="scroll-mt-24">
                    <p className="text-center text-4xl mt-4 text-emerald-500 font-extrabold font-fugaz">Batched</p>
                    <MenuList
                        drinks={batched}
                    />
                </div>

                {/* shots div */}
                <div id="shots" className="scroll-mt-24">
                    <p className="text-center text-4xl mt-4 text-emerald-500 font-extrabold font-fugaz">Shots</p>
                    <MenuList
                        drinks={shots}
                    />
                </div>
                {/* shots div */}
                <div id="mocktails" className="scroll-mt-24">
                    <p className="text-center text-4xl mt-4 text-emerald-500 font-extrabold font-fugaz">Mocktails</p>
                    <MenuList
                    drinks={mocktails}
                    />
                </div>
                <div className=" mb-20">
                    <p className="text-center text-4xl mt-4 text-emerald-500 font-extrabold font-fugaz">Build Your Own</p>
                    <div>
                    <MenuItem
                        className="rounded-full"
                        id = { 999 }
                        key = { 999 }
                        imageFileName = { "custom.png" }
                        name = { "Custom Drink" }
                        description = { "Welcome to the Build-A-Drink Workshop" }
                        ingredients = { [] }
                        cost = { 12 }
                    />
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Menu