import React from "react";

import Button from "../components/FormElements/Button"

const HomePage = () => {

    return (
        // WELCOME DIV
        <div className="text-white text-center">

            <div className="">
                <p className="italic text-2xl">Welcome to the 4th Annual</p>

                {/* DIV FOR NEW LOGO */}
                <div>
                    <p className="text-6xl text-green-600 mt-5 font-extrabold">DRINK 4 <br></br> THE KIDS</p>
                </div>

                <p className="text-2xl italic mt-2 mb-5">Christmas Cocktails for a Charitable Cause</p>

                <p className="text-3xl my-8 font-bold flex flex-col">Saturday,<span className="my-2">December 16th</span>5PM — Late</p>

                <Button
                    link = "https://docs.google.com/forms/d/e/1FAIpQLSeaCqqYVV38URqfCGFvf9ZXw-fSHigXAe0c55kPU8N5iN0Jag/viewform"
                    text = "RSVP HERE"
                />
            </div>

        {/* EXPLAINER DIV */}
            <div className="my-5">

                <p className="italic text-4xl my-5 font-bold">Not just another Christmas Party</p>

                <p className="text-2xl my-5">It's a holiday spirited pop up bar serving up <span className="italic font-bold">the best craft cocktails</span> and the worst puns for donations to a great cause</p>

                <p className="text-2xl font-extrabold italic">All proceeds go to charity</p>

                <p className="text-4xl font-extrabold text-green-600 my-8">Nicholas House Family Homeless Shelter</p>

                {/* <p className="text-2xl my-5">Welcome to the party</p> */}

                <Button
                    text = "Text 4 Address Here"
                    link = "sms:6787361277&body=drink4thekids%20Christmas%20party%20address%3F"
                />

            </div>

        </div>

    )
}

export default HomePage