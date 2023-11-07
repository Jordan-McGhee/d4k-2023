import React from "react";
import CardListItem from "../components/UIElements/CardListItem";
import Card from "../components/UIElements/Card"
import faq from "../images/icons/FAQ-red.png"

const FAQ = () => {

    const header = (
        <div className="flex items-end">
            <p>FAQs</p>
            <img src={faq} alt="faq red icon" className="w-10 ml-3 mb-1"/>
        </div>
    )

    return (
        <Card
            header = { header }
            headerClass = "font-bold text-3xl border-b-2 mb-2 pb-2 m-auto lg:max-w-xl"
        >
            <ul>
                <CardListItem
                    question = "What Charity?"
                    response = {`The Nicholas House and Bethany Haven. Both are a nonprofit agencies that operate emergency shelters, for homeless families.
                    They help families make the transition from homelessness to self-sufficiency in a structured, but home-like environment.`}
                    link = "https://nicholashouse.org/"
                    linkText = "Visit their site to read more"
                />
                <CardListItem
                    question = "How Can We Donate?"
                    response = {`You can order drinks and add donation tips on this website. Keep track of your tab under the "Pay Tab" button where
                    you can use your preferred payment method to donate. Once collected, we will DOUBLE your donation with a company match!
                    Visit the leaderboard to see the top donors.'
                    `}
                />
                <CardListItem
                    question = "What Should I Bring?"
                    response = "Your friends, your parents, your friend's parents, and a heart of gold (or cash/card)"
                />
                <CardListItem
                    question = "What's the Dress Code?"
                    response = "Tacky sweaters, xmas pajamas, santa tuxedoes. Bring that holiday spirit."
                />
                <CardListItem
                    question = "Can I BYOB?"
                    response = "Keep it to a minimum. We encourage you to swing by the bar to get served something worthy of your donations"
                />
                <CardListItem
                    question = "Can I Order Off-Menu?"
                    response = "Absolutely! We have a fully-stocked bar and you can put a custom drink order in on the order page. Just make sure to leave a comment telling us what you'd like!"
                />
                
            </ul>

        </Card>
    )
}

export default FAQ