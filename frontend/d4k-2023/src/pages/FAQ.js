import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardBody, CardHeader, CardFooter, Link, Button } from "@nextui-org/react";
import { faCandyCane, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const FAQ = () => {
    // Consolidated CSS classes for better maintainability
    const styles = {
        card: `border border-b-1 border-slate-300 rounded-t-none first:rounded-t-3xl 
               rounded-b-none last:rounded-b-3xl bg-slate-100 backdrop-blur-lg 
               w-full overflow-hidden shadow-lg`,
        header: `text-2xl font-fugaz justify-center text-emerald-700 pt-4 pb-0 mb-0`,
        body: `pt-2 text-lg justify-center text-center`,
        boldText: `font-bold`,
        highlightText: `text-xl font-bold text-blue-700`,
        companyMatch: `font-bold text-emerald-600`,
        warningText: `font-bold text-amber-600`
    };

    // FAQ data for better maintainability
    const faqData = [
        {
            id: 'charities',
            question: 'What Charities?',
            content: (
                <>
                    The Nicholas House shelters homeless families and assists them in the transition 
                    from homelessness to self-sufficiency. True Change equips underserved youth with 
                    tools for character development, emotional intelligence, and career readiness.
                </>
            ),
            footer: (
                <Link 
                    className={styles.highlightText} 
                    href="https://nicholashouse.org/about-us" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit their site to read more
                </Link>
            )
        },
        {
            id: 'donate',
            question: 'How Do We Donate?',
            content: (
                <>
                    Order drinks on this site at the party! Press the{' '}
                    <span className={styles.boldText}>Pay Tab</span> button where you can use 
                    your preferred payment method to complete your donation.
                    <br />
                    <span className={styles.companyMatch}>
                        We will triple your donation with a company match!
                    </span>
                    <br />
                    Visit the{' '}
                    <Link 
                        className={styles.highlightText} 
                        href="/leaderboard" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Leaderboard
                    </Link>{' '}
                    to see the top donors.
                </>
            )
        },
        {
            id: 'bring',
            question: 'What Should I Bring?',
            content: 'Your friends, your parents, your friend\'s parents, and a heart of gold (or cash/card)'
        },
        {
            id: 'dress-code',
            question: 'Dress Code?',
            content: 'Tacky sweaters, xmas pajamas, santa tuxedoes. Anything goes, just bring that holiday spirit!'
        },
        {
            id: 'byob',
            question: 'Can I BYOB?',
            content: (
                <>
                    Keep it to a minimum.
                    <br />
                    We encourage you to swing by the bar to get served something worthy of your donations
                </>
            )
        },
        {
            id: 'parking',
            question: 'Where is parking?',
            content: (
                <>
                    We recommend uber if drinking. However, if you want to drive, there will be some 
                    street parking available.{' '}
                    <span className={styles.warningText}>
                        We highly recommend carpooling, drinking responsibly, and having a designated driver.
                    </span>
                    <div className="mt-4">
                        <Button 
                            size="md" 
                            className="bg-emerald-600 text-sm py-3 border rounded-full font-fugaz text-white hover:bg-emerald-700 transition-colors"
                        >
                            <Link 
                                isExternal 
                                className="text-xl font-bold text-white flex items-center" 
                                href="https://partiful.com/e/HQP8KHQVUtxTTBQdNYgJ"
                            >
                                RSVP For Address
                                <FontAwesomeIcon className="ml-2" icon={faEnvelope} />
                            </Link>
                        </Button>
                    </div>
                </>
            )
        },
        {
            id: 'off-menu',
            question: 'Can I Order Off-Menu?',
            content: (
                <>
                    <div className={styles.boldText}>ABSOLUTELY</div>
                    You can put a custom drink order in on the{' '}
                    <Link 
                        className={styles.highlightText} 
                        href="/order?drinkId=999" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Order Page
                    </Link>
                    <br />
                    And tell us what you'd like our bartenders to whip up!
                </>
            )
        },
        {
            id: 'stats',
            question: 'Some Sobering Stats',
            content: (
                <div className="space-y-2">
                    <div>37% of Georgia's homeless are families with children</div>
                    <div>As of 2020, there are over 36,000 homeless children in Georgia</div>
                    <div className="text-xl font-bold text-red-600">
                        Almost 40% of the homeless in the United States are under 18
                    </div>
                    <div className="text-2xl font-fugaz text-emerald-600 italic pt-2">
                        So do it for the kids
                    </div>
                </div>
            )
        }
    ];
    return (
        <main className="max-w-2xl mx-auto mb-16 px-4">
            {/* Page Header */}
            <header className="flex items-center justify-center pb-4 text-4xl font-bungee text-emerald-600">
                <h1 className="flex items-center">
                    Info
                    <FontAwesomeIcon className="ml-4" icon={faCandyCane} aria-hidden="true" />
                </h1>
            </header>

            {/* FAQ Cards */}
            <section className="space-y-0" aria-label="Frequently Asked Questions">
                {faqData.map((faq, index) => (
                    <Card 
                        key={faq.id} 
                        className={styles.card}
                        role="article"
                        aria-labelledby={`faq-${faq.id}-header`}
                    >
                        <CardHeader className={styles.header}>
                            <h2 id={`faq-${faq.id}-header`}>{faq.question}</h2>
                        </CardHeader>
                        <CardBody className={styles.body}>
                            {faq.content}
                        </CardBody>
                        {faq.footer && (
                            <CardFooter className="justify-center pt-0">
                                {faq.footer}
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </section>
        </main>
    )
}

export default FAQ