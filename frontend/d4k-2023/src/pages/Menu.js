import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import MenuList from "../components/menu/MenuList";

import cocktails from "../assets/drinks.json"
import batched from "../assets/other.json"
import shots from "../assets/shots.json"


const Menu = () => {

    return (
        <div className="max-w-md m-auto">

            {/* div for buttons */}
            <div className="flex m-auto justify-between text-white fixed top-0 inset-x-0 p-4 w-full text-sm z-10 backdrop-blur-md bg-slate-500/80 max-w-md border-b-2 border-emerald-500">
                <Button
                    className="bg-emerald-600 focus:text-green-600 hover:text-green-600 text-slate-100 text-lg font-fugaz"
                    radius="full"
                    variant="ghost"
                    onPress={() => document.getElementById('cocktails').scrollIntoView({ behavior: 'smooth' })}
                >Cocktails</Button>

                <Button
                    className="bg-emerald-600 text-slate-100 text-lg font-fugaz"
                    radius="full" variant="ghost"
                    onClick={() => document.getElementById('batched').scrollIntoView({ behavior: 'smooth' })}
                >Batched</Button>

                <Button
                    className="bg-emerald-600 text-slate-100 text-lg font-fugaz"
                    radius="full" variant="ghost"
                    onClick={() => document.getElementById('shots').scrollIntoView({ behavior: 'smooth' })}>
                    Shots
                </Button>
            </div>

            <div className="mt-10 pt-10">
                <p className="text-white text-center text-2xl"> <span className="font-fugaz italic">WORK IN PROGRESS</span></p>
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
                <div id="shots" className="scroll-mt-24 mb-20">
                    <p className="text-center text-4xl mt-4 text-emerald-500 font-extrabold font-fugaz">Shots</p>
                    <MenuList
                        drinks={shots}
                    />
                </div>
            </div>
        </div>
    )
}

export default Menu