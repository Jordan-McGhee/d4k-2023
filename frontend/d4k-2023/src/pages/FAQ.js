import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, CardHeader, CardFooter, Link, Button } from "@nextui-org/react";
import { faCandyCane, faEnvelope } from "@fortawesome/free-solid-svg-icons";
const FAQ = () => {

    const cardCls = `border border-b-1 border-slate-300 rounded-t-none first:rounded-t-3xl
        rounded-b-none last:rounded-b-3xl bg-slate-100 backdrop-blur-lg w-full overflow-hidden shadow-lg`

    const headerCls = `text-2xl font-fugaz justify-center text-emerald-700 pt-4 pb-0 mb-0`

    const bodyCls = `pt-2 text-lg justify-center text-center`
    return (
        <div className="max-w-2xl m-auto mb-16">
            <div className="flex pb-4 text-4xl font-bungee text-center justify-center text-emerald-600">
                Info
                <FontAwesomeIcon className="pl-4" icon={faCandyCane} />
            </div>
            <div>
                <Card className={cardCls}>
                    <CardHeader className={headerCls}>
                        What Charities?
                    </CardHeader>
                    <CardBody className={bodyCls}>
                        The Nicholas House shelters homeless families and assists them in the transition from homelessness to self-sufficiency.
                        True Change equips underserved youth with tools for character development, emotional intelligence, and career readiness.
                    </CardBody>
                    <CardFooter className="justify-center pt-0">
                        <Link className="text-xl font-bold text-blue-700" href="https://nicholashouse.org/about-us" target="_blank">Visit their site to read more</Link>
                    </CardFooter>
                </Card>
                <Card className={cardCls}>
                    <CardHeader className={headerCls}>
                        How Do We Donate?
                    </CardHeader>
                    <CardBody className={bodyCls}>
                        Order drinks on this site at the party! Press the
                        <span className="font-bold contents"> Pay Tab </span>button where
                        you can use your preferred payment method to complete your donation.
                        <br /><span className="font-bold contents">We will triple your donation with a company match!</span>
                        <br />Visit the
                        <Link className="text-xl contents font-bold" href="/leaderboard" target="_blank"> Leaderboard </Link><br />
                        to see the top donors.
                    </CardBody>
                </Card>
                <Card className={cardCls}>
                    <CardHeader className={headerCls}>
                        What Should I Bring?
                    </CardHeader>
                    <CardBody className={bodyCls}>
                        Your friends, your parents, your friend's parents, and a heart of gold (or cash/card)
                    </CardBody>
                </Card>
                <Card className={cardCls}>
                    <CardHeader className={headerCls}>
                        Dress Code?
                    </CardHeader>
                    <CardBody className={bodyCls}>
                        Tacky sweaters, xmas pajamas, santa tuxedoes. Anything goes, just bring that holiday spirit!
                    </CardBody>
                </Card>
                <Card className={cardCls}>
                    <CardHeader className={headerCls}>
                        Can I BYOB?
                    </CardHeader>
                    <CardBody className={bodyCls}>
                        Keep it to a minimum. <br /> We encourage you to swing by the bar to get served something worthy of your donations
                    </CardBody>
                </Card>
                <Card className={cardCls}>
                    <CardHeader className={ headerCls }>
                        Where is parking?
                    </CardHeader>
                    <CardBody className={ bodyCls }>
                        We recommend uber if drinking. However, if you want to drive, there will be some street parking available. <span className="font-bold contents">We highly recommend carpooling, drinking responsibly, and having a designated driver.</span>
                        <Button size="md" winterize className="ml-1 bg-emerald-600 text-sm py-3 border rounded-full font-fugaz text-white">
                            <Link isExternal className="text-xl font-bold text-white-700" href="https://partiful.com/e/HQP8KHQVUtxTTBQdNYgJ">
                            RSVP For Address  
                            <FontAwesomeIcon className="pl-2" icon={faEnvelope}/>
                            </Link>

                        </Button>
                    </CardBody>
                </Card>
                <Card className={cardCls}>
                    <CardHeader className={headerCls}>
                        Can I Order Off-Menu?
                    </CardHeader>
                    <CardBody className={bodyCls}>
                        <div className="font-bold">ABSOLUTELY</div>You can put a custom drink order in on the
                        <Link className="text-xl contents font-bold" href="/order?drinkId=999" target="_blank"> Order Page </Link><br />
                        And tell us what you'd like our bartenders to whip up!
                    </CardBody>
                </Card>
                <Card className={cardCls}>
                    <CardHeader className={headerCls}>
                        Some Sobering Stats
                    </CardHeader>
                    <CardBody className={bodyCls}>
                        <div className="pb-2">37% of Georgia's homeless are families with children</div>
                        <div className="py-2">As of 2020, there are over 36,000 homeless children in Georgia</div>
                        <div className=" py-2 text-xl font-bold">Almost 40% of the homeless in the United States are under 18</div>
                        <div className="text-2xl font-fugaz text-emerald-600 italic pt-2">So do it for the kids</div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default FAQ