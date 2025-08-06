import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./BartabNav.css"
import "./MobileNav.css"
import { UserApi } from "../api/userApi";
import { ScrollShadow, Button } from "@nextui-org/react";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro, faInfo, faInfoCircle, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

const BartabNav = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const [user, setUser] = useState(null)
    const [showOrderHistory, setShowOrderHistory] = useState(false)
    const [tabData, setTabData] = useState(null)
    const [totalOwed, setTotalOwed] = useState(0)
    const [venmoUrl, setVenmoUrl] = useState('https://venmo.com/jacobwebber')
    const [paypalUrl, setPaypalUrl] = useState('https://paypal.me/jacobwwebber')
    const location = useLocation();
    const { getTab, updateUserPhoto, getUserById } = UserApi()
    const fileInputRef = useRef();

    // set initial state for the object from db here
    const [imageData, setImageData] = useState({ img: "" });
    const [file, setFile] = useState(null);

    function handleChange(e) {
        if (e.target.files[0])
            setFile(e.target.files[0]);
    }

    useLayoutEffect(() => {
        const localStorageUserId = localStorage.getItem('userId')
        if (localStorageUserId) {
            const getUserTab = async () => {
                try {
                    const responseData = await getTab(localStorageUserId)
                    setTabData(responseData)
                } catch (error) {
                    console.log(error)
                }
            }
            getUserTab()
        }
        if (location.hash === "#bartab") {
            setIsChecked(true)
        }
    }, [location])

    useLayoutEffect(() => {
        const localStorageUserId = localStorage.getItem('userId')
        if (localStorageUserId) {
            const getUser = async () => {
                try {
                    const userResponse = await getUserById(localStorageUserId)
                    if(!userResponse.user) return
                    setUser(userResponse.user)
                } catch (error) {
                    console.log(error)
                }
            }
            getUser()

        }
    }, [location])

    const uploadFile = async () => {
        const storageRef = ref(storage, `user-${user.user_id}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log("upload is" + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload paused");
                        break
                    case "running":
                        console.log("Upload running");
                        break
                    default:
                        break
                }
            },
            (error) => {
                console.log(error);
            },
            async () => {
                await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadedURL) => {

                    setUser(prevState => ({
                        ...prevState,
                        photo_url: downloadedURL
                    }))
                    setImageData((prev) => ({ ...prev, img: downloadedURL }));
                })
            }
        )
    }

    useEffect(() => {
        if (file) {
            uploadFile()
        }
    }, [file])

    useEffect(() => {
        const updateImg = async () => {
            await updateUserPhoto(user.user_id, imageData.img)
        }
        if (imageData.img) {
            updateImg()
        }
    }, [imageData])

    useEffect(() => {
        if (tabData) {
            setTotalOwed(tabData.tab.tab_total)

            let note = `(${tabData.tab.username}) ${tabData.tab.quantity || 0} drinks $${tabData.tab.drink_cost_total}${tabData.tab.tips_total ? `, and $${tabData.tab.tips_total} tip` : ''}`

            let venmo = `https://venmo.com/drink4thekids?txn=pay&amount=${tabData.tab.tab_total}&note=${note}`.replace(/ /g, '%C2%A0')
            setVenmoUrl(venmo)
            let paypal = `https://paypal.me/jacobwwebber/${tabData.tab.tab_total}?&item_name=${note}`.replace(/ /g, '%C2%A0')
            setPaypalUrl(paypal)
        }
    }, [tabData]);

    let orderHistoryList = []

    if (tabData) {
        let orderHistory = tabData.tab.order_history

        orderHistory.split(", ").map((hist) => {
            let splitArr = hist.split("—")
            let key = splitArr[0]
            let value = splitArr[1]
            orderHistoryList.push(
                <div key={`${key} - ${value}`} className="ml-2 text-xs my-0.5">
                    {`${value} x ${key}`}
                </div>
            )
        })
    }

    return (
        <div>
            {user &&
                <div className={`outer-menu menu-left ${!isChecked ? 'animate-pulse' : ''}`}>

                    <input id="nav-checkbox" className="checkbox-toggle" type="checkbox"
                        onChange={(event) => setIsChecked(event.currentTarget.checked)}
                    />
                    <div className="bar-tab border-2 border-white border-solid rounded-full">
                        <div className="font-fugaz text-white tracking-widest">Pay Tab</div>
                    </div>
                    <div className="menu">
                        <div style={{ height: '150%' }}>
                            <div>
                                <div>

                                    <form className="top-0" onSubmit={uploadFile}>
                                        <input className="hidden" ref={fileInputRef} type="file" onChange={handleChange} />
                                        <Button
                                            radius="full"
                                            size="lg"
                                            isIconOnly className="z-[1000] float-right bg-white border-2 w-20 h-20 rounded-full ml-2"
                                            onPress={() => fileInputRef.current.click()}>
                                            {user && user.photo_url ? <img alt="Profile Pic" className="" src={user.photo_url} /> :
                                                <FontAwesomeIcon size="xl" className="text-gray-700" icon={faCameraRetro} />
                                            }
                                        </Button>
                                    </form>
                                </div>
                                <div><div className="font-bungee text-3xl"><span className="fas fa-cocktail"></span>BAR TAB<span className="fas fa-glass-whiskey"></span> </div>
                                </div>
                                <div><div className="font-bungee text-xl mb-4" id="bar-tab-name">{user.username}</div></div>
                                {orderHistoryList.length > 0 &&
                                    <div className="my-4 text-lg">
                                        {/* show history button */}
                                        <Button className="rounded-full font-bold text-xs text-slate-100 py-0 my-0 bg-red-400 shadow-md" size="sm" onPress={() => setShowOrderHistory(!showOrderHistory)}>
                                            {showOrderHistory ? 'Hide Orders' : 'Show Orders'}
                                        </Button>

                                        {showOrderHistory &&
                                            <ScrollShadow size={20} className="my-1 max-h-[8rem] overflow-y-scroll">
                                                {orderHistoryList}
                                            </ScrollShadow>
                                        }
                                    </div>
                                }

                                {tabData &&
                                    <div>
                                        <p className="text-xl flex justify-between">Drinks Ordered:
                                            <span className=" uppercase font-bold">
                                                {tabData.tab.quantity}
                                            </span>
                                        </p>

                                        <p className="text-xl flex justify-between">Drinks Total:
                                            <span className=" uppercase font-bold">
                                                ${tabData.tab.drink_cost_total}
                                            </span>
                                        </p>

                                        <p className="text-xl flex justify-between">Additional Tip:
                                            <span className=" uppercase font-bold ">
                                                ${tabData.tab.tips_total}
                                            </span>
                                        </p>

                                        <p className="text-2xl flex justify-between border-t-2 pt-4">Total Due:
                                            <span className="uppercase font-bold">
                                                ${totalOwed}
                                            </span>
                                        </p>
                                    </div>
                                }
                                <div>
                                    <div className="justify-content-center mt-6">
                                        <div className="flex justify-between">
                                            {/* <hr className="hr-bold" /> */}
                                            <Link
                                                className="w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 mx-2 paypal"
                                                target="_blank"
                                                to={paypalUrl}>
                                            </Link>
                                            <Link
                                                className="w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 cashapp"
                                                target="_blank"
                                                to={`https://cash.app/$wakejebber/${totalOwed}`}>
                                            </Link>
                                            <Link
                                                className="w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 mx-2 venmo"
                                                target="_blank"
                                                to={venmoUrl}>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {
                                    <div className="pt-4">
                                        <div className="text-lg font-bungee text-center">Your Donations:<span className="pl-2 text-emerald-400">${tabData?.tab.total_donated} </span></div>
                                    </div>
                                }

                                <div className="flex flex-col items-center text-center text-white my-4 gap-y-2 max-w-72 font-fugaz">
                                    <FontAwesomeIcon icon={faInfoCircle} className="h-8" />
                                    <p>Please be patient as we mark your tab as paid. It should update soon!</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default BartabNav