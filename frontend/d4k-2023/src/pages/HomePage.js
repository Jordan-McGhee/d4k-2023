import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChampagneGlasses, faClose } from '@fortawesome/free-solid-svg-icons'
import Button from "../components/FormElements/Button"
import BuddyLogo from "../components/UIElements/BuddyLogo"
import Modal from "../components/UIElements/Modal"
import { toast, Zoom } from 'react-toastify';

const HomePage = () => {
    const Msg = ({ closeToast, toastProps }) => (
        <div className="grid place-content-center text-center">
            <div className="font-fugaz text-lg">Welcome to the party</div>
            <div className="flex pt-3">
                <Button winterize className="mx-1 bg-green-600 text-md px-5 py-3 border rounded-full text-white float-right" target="_blank"
                    link="https://docs.google.com/forms/d/e/1FAIpQLSeaCqqYVV38URqfCGFvf9ZXw-fSHigXAe0c55kPU8N5iN0Jag/viewform">
                    RSVP
                    </Button>
                    <Button winterize className="mx-1 bg-green-600 text-md px-5 py-3 border rounded-full text-white float-right"
                        link="sms:6787361277&body=drink4thekids%20Christmas%20party%20address%3F">
                    Address
                    </Button>
            </div>
        </div>
    )
        
    useEffect(() => {
        const notify = () => toast(<Msg/>, {
            position: "bottom-center",
            hideProgressBar: true,
            autoClose: 999999,
            delay: 3000,
            pauseOnHover: true,
            progress: undefined,
            theme: "light"
            });

            
            let now = new Date()
            let partyTime = new Date("2023-12-16")
            if(now < partyTime){
                notify();
            }
    }, [])



    return (
        // WELCOME DIV
        <div className="text-white text-center">

            <div>
                <p className="italic font-fugaz text-2x1">Welcome to the 4th Annual</p>

                {/* DIV FOR NEW LOGO */}
                <div>
                    <p className="text-6xl text-green-600 mt-5 font-extrabold font-bungee title">DRINK 4 <br></br> THE KIDS
                        <br/><FontAwesomeIcon className="title" icon={faChampagneGlasses}></FontAwesomeIcon>
                    </p>
                </div>

                <p className="text-2xl italic font-fugaz mt-2 mb-5">Christmas Cocktails for a Charitable Cause</p>

                <p className="text-3xl my-8 font-bold font-bungee flex flex-col">Saturday<span className="my-2">December 16th</span>5PM — Late</p>

                <BuddyLogo />
            </div>

        {/* EXPLAINER DIV */}
            <div className="py-5 my-5">

                <p className="italic text-3xl my-5 font-bold font-fugaz">Not just another Christmas Party</p>

                <p className="text-2xl my-5">It's a holiday spirited pop up bar serving up <span className="italic font-bold">the best craft cocktails</span> and the worst puns for donations to a great cause</p>

                <p className="text-2xl font-extrabold italic">All proceeds go to Nicholas House Family Homeless Shelter</p>
                <br/>
                <Button winterize link="/info" >
                    Read More
                </Button>
                    <br/><br/><br/><br/>

            </div>


        </div>

    )
}

export default HomePage