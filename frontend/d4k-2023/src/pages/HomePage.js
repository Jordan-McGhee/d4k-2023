import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChampagneGlasses, faClose } from '@fortawesome/free-solid-svg-icons'
import BuddyLogo from "../components/UIElements/BuddyLogo"
import { toast } from 'react-toastify';
import { Link, Button, useDisclosure, Modal, ModalHeader, ModalFooter, ModalBody, ModalContent } from "@nextui-org/react";
import icsFile from '../assets/drink4thekidsparty.ics'

const HomePage = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const Msg = ({ closeToast, toastProps }) => (
        <div className=" z-50 grid place-content-center text-center">
            <div className="font-fugaz text-lg">Welcome to the party</div>
            <div className="flex pt-3">
                <Button winterize className="mx-1 bg-green-600 text-md px-5 py-3 border rounded-full text-white float-right" target="_blank"
                    onPress={() => openInNewTab("https://docs.google.com/forms/d/e/1FAIpQLSeaCqqYVV38URqfCGFvf9ZXw-fSHigXAe0c55kPU8N5iN0Jag/viewform")}>
                    RSVP
                    </Button>
                    <Button winterize className="mx-1 bg-green-600 text-md px-5 py-3 border rounded-full text-white float-right"
                        onPress={() => openInNewTab("sms:6787361277&body=drink4thekids%20Christmas%20party%20address%3F")}>
                    Address
                    </Button>
            </div>
        </div>
    )
        
    useEffect(() => {
        const notify = () => toast(<Msg/>, {
                position: "top-center",
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
   <Modal className="z-[1000]"         backdrop="opaque" 
 placement="top" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add To ...</ModalHeader>
              <ModalBody>
                <Button color="success" radius="full" variant="shadow" 
                    onPress={() => openInNewTab("https://www.google.com/calendar/render?action=TEMPLATE&text=Drink4TheKidsParty&dates=20231216T220000Z/20231217T080000Z&details=Christmas%20Cocktails%20for%20a%20Charitable%20Cause%0A5pm%20Saturday%20Dec%2016&location=195%20Arizona%20Ave%20NE&trp=true&sf=true&output=xml#f")}>
                  Google Calendar
                </Button>
                <Button color="success" radius="full" variant="shadow" 
                   >
                 <a href={icsFile} download="d4k-party.ics">Phone Calendar</a>
                </Button>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
            <div>
                <p className="italic font-fugaz text-2x1">Welcome to the 4th Annual</p>

                {/* DIV FOR NEW LOGO */}
                <div>
                    <p className="text-6xl text-green-600 my-3 font-extrabold font-bungee title">DRINK 4 <br></br> THE KIDS
                        <br/><FontAwesomeIcon className="mt-4 title font-extrabold" icon={faChampagneGlasses}></FontAwesomeIcon>
                    </p>
                </div>

                <p className="text-2xl italic font-fugaz mt-2">Christmas Cocktails <br/> for a Charitable Cause</p>

                <p onClick={onOpen} className="text-3xl mt-6 mb-8 font-bold font-bungee flex flex-col underline tracking-wider">
                    Saturday<span className="my-2">
                        December 16th</span>
                        6PM — Late
                </p>
                <BuddyLogo />
            </div>

        {/* EXPLAINER DIV */}
            <div className="py-5 mb-5 mt-8">

                <p className="italic text-3xl my-5 font-bold font-fugaz">Not just another Christmas Party</p>

                <p className="text-2xl my-5">It's a holiday spirited pop up bar serving up <span className="italic font-bold">the best craft cocktails</span> and the worst puns for donations to a great cause</p>

                <p className="text-2xl font-extrabold italic">All donations are matched and all proceeds go to Bethany Haven & Nicholas House Family Homeless Shelter</p>
                <br/>
                <Button 
                className="uk-button bg-green-600" 
                radius="full" as={Link} href="/FAQ" >
                    Read More
                </Button>
                    <br/><br/><br/><br/>

            </div>


        </div>

    )
}

export default HomePage