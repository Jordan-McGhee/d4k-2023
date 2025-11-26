import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faChampagneGlasses, faEnvelope, faLocation, faLocationArrow, faLocationPin, faMapLocation, faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import BuddyLogo from "../components/UIElements/BuddyLogo"
import { toast } from 'react-toastify';
import { Link, Button, useDisclosure, Modal, ModalHeader, ModalFooter, ModalBody, ModalContent } from "@nextui-org/react";
import icsFile from '../assets/drink4thekidsparty.ics'

const HomePage = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const Msg = ({ closeToast, toastProps }) => (
        <div className=" z-50 grid place-content-center text-center w-100">
            <div className="font-fugaz text-lg">Welcome to the party</div>
            <div className="flex pt-3 justify-center text-center">
                <Button winterize className="ml-1 bg-emerald-600 text-sm py-3 border rounded-full rounded-r-none font-fugaz text-white" target="_blank"
                    onPress={() => {
                        openInNewTab("https://partiful.com/e/k6bxgLhcL5mlVO2gHpSp");
                        closeToast()
                    }}>
                    RSVP <FontAwesomeIcon icon={faEnvelope} />
                </Button>
                <Button winterize className="bg-emerald-600 text-sm py-3 border rounded-none font-fugaz text-white"
                    onPress={() => { openInNewTab("sms:6787361277"); closeToast() }}>
                    Message Host <FontAwesomeIcon icon={faLocationArrow} />
                </Button>
                <Button winterize className="mr-1 bg-emerald-600 text-sm py-3 border rounded-full rounded-l-none font-fugaz text-white"
                    onPress={() => { onOpen(); closeToast() }}>
                    Save Date<FontAwesomeIcon icon={faCalendar} />
                </Button>
            </div>
        </div>
    )

    useEffect(() => {
        const notify = () => toast(<Msg />, {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 999999,
            delay: 3000,
            pauseOnHover: true,
            progress: undefined,
            theme: "light"
        });

        if (true) {
            notify();
        }

        // Cleanup: close all toasts when component unmounts (user navigates away)
        return () => {
            toast.dismiss();
        };
    }, [])

    return (
        // WELCOME DIV
        <div className="text-white text-center">
            <Modal className="z-[1000]" backdrop="opaque" placement="top" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add To ...</ModalHeader>
                            <ModalBody>
                                <Button color="success" radius="full" variant="shadow"
                                    onPress={() => openInNewTab("https://www.google.com/calendar/render?action=TEMPLATE&text=Drink4TheKidsParty&dates=20251213T230000Z/20251213T080000Z&details=Christmas%20Cocktails%20for%20a%20Charitable%20Cause%0A6pm%20Saturday%20Dec%2014&location=195%20Arizona%20Ave%20NE&trp=true&sf=true&output=xml#f")}>
                                    Google Calendar
                                </Button>
                                <Button color="success" radius="full" variant="shadow">
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
                {/* <p className="italic font-fugaz text-2x1">Welcome to the 4th Annual</p> */}

                <div>
                    <p className="text-6xl text-emerald-600 my-3 font-extrabold font-bungee title">DRINK 4 <br></br> THE KIDS
                    </p>
                </div>

                <p className="text-2xl italic font-fugaz mt-2">Christmas Cocktails <br /> for a Charitable Cause</p>

          
                {/* <p className="text-xl mt-6 mb-8 font-bold font-bungee flex flex-col tracking-wider">
                    See you all next year!
                </p> */}
                <p onClick={onOpen} className="text-3xl mt-6 mb-8 font-bold font-bungee flex flex-col underline tracking-wider">
                    Saturday<span className="my-2">
                        December 13th</span>
                    6PM — Late
                </p>
                <BuddyLogo />
                <Button winterize className="mx-1 bg-emerald-600 text-md px-5 py-3 border rounded-full font-fugaz text-white"
                    onPress={() => openInNewTab("https://partiful.com/e/k6bxgLhcL5mlVO2gHpSp")}>
                    RSVP <FontAwesomeIcon icon={faEnvelope} />
                </Button>
            </div>

            {/* EXPLAINER DIV */}
            <div className="py-5 mb-5">

                <p className="italic text-3xl my-5 font-bold">Not just another Christmas Party</p>

                <p className="text-2xl my-5">It's a holiday spirited pop up bar serving up <span className="italic font-bold">the best craft cocktails</span> and the worst puns for donations to a great cause</p>

                <div className="text-3xl font-bold font-fugaz">all donations are <span className="font-extrabold text-4xl">TRIPLED</span></div><div className="text-2xl">with a match and go to <br />
                    <a className="text-emerald-500" target="_blank" href="https://nicholashouse.org/" rel="noreferrer">Nicholas House Family Homeless Shelter</a> &
                    <a className="text-emerald-500" target="_blank" href="https://www.maketruechange.org/" rel="noreferrer"> True Change</a> </div>
                <br />
                <Button
                    className="uk-button bg-emerald-600 text-slate-200 font-fugaz"
                    radius="full" as={Link} href="/FAQ" >
                    Read More
                </Button>

            </div>

            {/* SPONSOR DIV */}
            <p className="italic text-3xl my-5 font-bold font-fugaz">Special thanks to our sponsors!</p>

            <div className="flex flex-col gap-y-4 text-2xl text-emerald-500 italic">
                <a target="_blank" rel="noreferrer" href={"https://www.minhwaspirits.com/"}>Minwha Spirits</a>
                <a target="_blank" rel="noreferrer" href={"https://www.instagram.com/moxieburger_candlerpark/"}>Moxie - Candler Park</a>
                <a target="_blank" rel="noreferrer" href={"https://www.instagram.com/moxieburger_candlerpark/"}>Moxie - Candler Park</a>
                <a target="_blank" rel="noreferrer" href={"https://kingcube.com/"}>King Cube Ice</a>
            </div>

            <br /><br /><br /><br />
        </div>
    )
}

export default HomePage