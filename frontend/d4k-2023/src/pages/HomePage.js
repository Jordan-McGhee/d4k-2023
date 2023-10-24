import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons'
import Button from "../components/FormElements/Button"
import BuddyLogo from "../components/UIElements/BuddyLogo"

const HomePage = () => {

    return (
        // WELCOME DIV
        <div className="text-white text-center">

            <div>
                <p className="italic font-fugaz text-2x1">Welcome to the 4th Annual</p>

                {/* DIV FOR NEW LOGO */}
                <div>
                    <p className="text-6xl text-green-600 mt-5 font-extrabold font-bungee title">DRINK 4 <br></br> THE KIDS
                        <FontAwesomeIcon className="title" icon={faChampagneGlasses}></FontAwesomeIcon>
                    </p>
                </div>

                <p className="text-2xl italic font-fugaz mt-2 mb-5">Christmas Cocktails for a Charitable Cause</p>

                <p className="text-3xl my-8 font-bold font-bungee flex flex-col">Saturday,<span className="my-2">December 16th</span>5PM — Late</p>

                <BuddyLogo />

                <Button winterize
                    link = "https://docs.google.com/forms/d/e/1FAIpQLSeaCqqYVV38URqfCGFvf9ZXw-fSHigXAe0c55kPU8N5iN0Jag/viewform"
                    text = "RSVP HERE"
                />
            </div>

        {/* EXPLAINER DIV */}
            <div className="py-5 my-5">

                <p className="italic text-3xl my-5 font-bold font-fugaz">Not just another Christmas Party</p>

                <p className="text-2xl my-5">It's a holiday spirited pop up bar serving up <span className="italic font-bold">the best craft cocktails</span> and the worst puns for donations to a great cause</p>

                <p className="text-2xl font-extrabold italic">All proceeds go to charity</p>

                <p className="text-4xl font-extrabold text-green-600 my-8">Nicholas House Family Homeless Shelter</p>

                {/* <p className="text-2xl my-5">Welcome to the party</p> */}

                <Button
                    winterize
                    text = "Text 4 Address Here"
                    link = "sms:6787361277&body=drink4thekids%20Christmas%20party%20address%3F"
                />

            </div>

        </div>

    )
}

export default HomePage