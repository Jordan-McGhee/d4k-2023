import React, { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./BartabNav.css"
import "./MobileNav.css"
import { UserApi } from "../api/userApi";
import { ScrollShadow, Button, Input } from "@nextui-org/react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRetro, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons'

// Payment URL configurations
const PAYMENT_CONFIG = {
    venmo: {
        baseUrl: 'https://venmo.com/drink4thekids',
        className: 'w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 mx-2 payment-icon venmo'
    },
    paypal: {
        baseUrl: 'https://paypal.me/jacobwwebber',
        className: 'w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 mx-2 payment-icon paypal'
    },
    cashapp: {
        baseUrl: 'https://cash.app/$wakejebber',
        className: 'w-16 h-16 bg-cover bg-center bg-no-repeat inline-flex rounded-2xl border-2 payment-icon cashapp'
    }
};

const BartabNav = () => {
    // State management
    const [isChecked, setIsChecked] = useState(false);
    const [user, setUser] = useState(null);
    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const [tabData, setTabData] = useState(null);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [showTabUpdateRequest, setShowTabUpdateRequest] = useState(false);
    const [paymentAccount, setPaymentAccount] = useState('');
    
    const location = useLocation();
    const { getTab, updateUserPhoto, getUserById, updatePaymentAccount } = UserApi();
    const fileInputRef = useRef();
    const paymentAccountInputRef = useRef();

    // Memoized calculations to prevent unnecessary re-renders
    const totalOwed = useMemo(() => tabData?.tab?.tab_total || 0, [tabData]);
    
    const paymentUrls = useMemo(() => {
        if (!tabData) return {};
        
        const note = `(${tabData.tab.username}) ${tabData.tab.quantity || 0} drinks $${tabData.tab.drink_cost_total}${tabData.tab.tips_total ? `, and $${tabData.tab.tips_total} tip` : ''}`;
        
        return {
            venmo: `${PAYMENT_CONFIG.venmo.baseUrl}?txn=pay&amount=${totalOwed}&note=${note}`.replace(/ /g, '%C2%A0'),
            paypal: `${PAYMENT_CONFIG.paypal.baseUrl}/${totalOwed}?&item_name=${note}`.replace(/ /g, '%C2%A0'),
            cashapp: `${PAYMENT_CONFIG.cashapp.baseUrl}/${totalOwed}`
        };
    }, [tabData, totalOwed]);

    const orderHistoryList = useMemo(() => {
        if (!tabData?.tab?.order_history) return [];
        
        return tabData.tab.order_history.split(", ").map((hist) => {
            const splitArr = hist.split("—");
            const key = splitArr[0];
            const value = splitArr[1];
            return (
                <div key={`${key} - ${value}`} className="ml-2 text-xs my-0.5">
                    {`${value} x ${key}`}
                </div>
            );
        });
    }, [tabData]);

    const handleFileChange = useCallback((e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setUploadError(null);
        }
    }, []);

    const uploadFile = useCallback(async () => {
        if (!file || !user) return;
        
        setIsUploading(true);
        setUploadError(null);
        
        try {
            const storageRef = ref(storage, `user-${user.user_id}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                },
                (error) => {
                    console.error("Upload failed:", error);
                    setUploadError("Upload failed. Please try again.");
                    setIsUploading(false);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        setUser(prevState => ({
                            ...prevState,
                            photo_url: downloadURL
                        }));
                        await updateUserPhoto(user.user_id, downloadURL);
                    } catch (error) {
                        console.error("Failed to update photo:", error);
                        setUploadError("Failed to save photo. Please try again.");
                    } finally {
                        setIsUploading(false);
                    }
                }
            );
        } catch (error) {
            console.error("Upload error:", error);
            setUploadError("Upload failed. Please try again.");
            setIsUploading(false);
        }
    }, [file, user]);

    useLayoutEffect(() => {
        const localStorageUserId = localStorage.getItem('userId');
        if (localStorageUserId) {
            const getUserTab = async () => {
                try {
                    const responseData = await getTab(localStorageUserId);
                    setTabData(responseData);
                } catch (error) {
                    console.error('Failed to fetch user tab:', error);
                }
            };
            getUserTab();
        }
        if (location.hash === "#bartab") {
            setIsChecked(true);
        }
    }, [location]);

    useLayoutEffect(() => {
        const localStorageUserId = localStorage.getItem('userId');
        if (localStorageUserId) {
            const getUser = async () => {
                try {
                    const userResponse = await getUserById(localStorageUserId);
                    if (!userResponse.user) return;
                    setUser(userResponse.user);
                    if(userResponse.user.payment_account) {
                        setPaymentAccount(userResponse.user.payment_account);
                    }
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            };
            getUser();
        }
    }, [location]);

    // Handle file upload when file changes
    useEffect(() => {
        if (file) {
            uploadFile();
        }
    }, [file]);

    const handleTabUpdateRequest = () => {
        // TODO: Add API call to submit tab update request with user info and venmo account
        console.log('Tab update requested:', {
            userId: user?.user_id,
            username: user?.username,
            venmoAccount: paymentAccount,
            totalOwed: totalOwed
        });
        setPaymentAccount('');
    };

    return (
        <div>
            {user && (
                <div className={`outer-menu menu-left ${!isChecked ? 'animate-pulse' : ''}`}>
                    <input 
                        id="nav-checkbox" 
                        className="checkbox-toggle" 
                        type="checkbox"
                        onChange={(event) => {
                            setIsChecked(event.currentTarget.checked);
                            if (!event.currentTarget.checked) {
                                setShowTabUpdateRequest(false);
                            }
                        }}
                    />
                    <div className="bar-tab border-2 border-white border-solid rounded-full">
                        <div className="font-fugaz text-white tracking-widest">{totalOwed > 0 ? `Pay Tab` : <FontAwesomeIcon size="2x" icon={faUser}/>}</div>
                    </div>
                    <div className="menu">
                        <div style={{ height: '150%' }}>
                            <div>
                                {/* Profile Photo Upload */}
                                <div>
                                    <form className="top-0" onSubmit={(e) => e.preventDefault()}>
                                        <input 
                                            className="hidden" 
                                            ref={fileInputRef} 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleFileChange} 
                                        />
                                        <Button
                                            radius="full"
                                            size="lg"
                                            isIconOnly 
                                            className={`z-[1000] float-right bg-white border-2 w-20 h-20 rounded-full ml-2 ${!user.photo_url ? 'animate-pulse shadow-lg shadow-gray-400' : ''}`}
                                            onPress={() => fileInputRef.current?.click()}
                                            isLoading={isUploading}
                                            aria-label={user.photo_url ? "Change profile picture" : "Upload profile picture"}
                                        >
                                            {user.photo_url ? (
                                                <img 
                                                    alt="Profile" 
                                                    className="w-full h-full object-cover rounded-full" 
                                                    src={user.photo_url} 
                                                />
                                            ) : (
                                                <div>
                                                <FontAwesomeIcon size="xl" className="text-gray-700" icon={faCameraRetro} />
                                                <div className="text-xs italic">Upload <br></br>Profile Pic</div></div>
                                            )}
                                        </Button>
                                    </form>
                                    {uploadError && (
                                        <div className="text-red-500 text-xs mt-2">{uploadError}</div>
                                    )}
                                </div>

                                {/* Header */}
                                <div>
                                    <div className="font-bungee text-3xl">
                                        <span className="fas fa-cocktail"></span>
                                        BAR TAB
                                        <span className="fas fa-glass-whiskey"></span>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bungee text-xl mb-4" id="bar-tab-name">
                                        {user.username}
                                    </div>
                                </div>

                                {/* Order History */}
                                {orderHistoryList.length > 0 && (
                                    <div className="my-4 text-lg">
                                        <Button 
                                            className="rounded-full font-bold text-xs text-slate-100 py-0 my-0 bg-red-400 shadow-md" 
                                            size="sm" 
                                            onPress={() => setShowOrderHistory(!showOrderHistory)}
                                        >
                                            {showOrderHistory ? 'Hide Orders' : 'Show Orders'}
                                        </Button>

                                        {showOrderHistory && (
                                            <ScrollShadow size={20} className="my-1 max-h-[8rem] overflow-y-scroll">
                                                {orderHistoryList}
                                            </ScrollShadow>
                                        )}
                                    </div>
                                )}

                                {/* Tab Summary */}
                                {tabData && (
                                    <div className="space-y-2">
                                        <p className="text-l flex justify-between">
                                            Drinks Ordered:
                                            <span className="uppercase font-bold">
                                                {tabData.tab.quantity}
                                            </span>
                                        </p>

                                        <p className="text-l flex justify-between">
                                            Drinks Total:
                                            <span className="uppercase font-bold">
                                                ${tabData.tab.drink_cost_total}
                                            </span>
                                        </p>

                                        <p className="text-l flex justify-between">
                                            Additional Donation:
                                            <span className="uppercase font-bold">
                                                ${tabData.tab.tips_total}
                                            </span>
                                        </p>

                                        <p className="text-2xl flex justify-between border-t-2 pt-4">
                                            Total Due:
                                            <span className="uppercase font-bold">
                                                ${totalOwed}
                                            </span>
                                        </p>
                                    </div>
                                )}

                                
                                {/* Info Message */}
                                <div className="flex flex-col items-center text-center text-white my-4 gap-y-2 max-w-72 font-fugaz">
                                    <FontAwesomeIcon icon={faInfoCircle} className="h-8" />
                                    <p>Click a link below to donate. Please be patient as we close your tab. Request an update or visit the bar for faster service.</p>
                                </div>

                                {/* Request Tab Update */}
                                {totalOwed > 0 && (
                                    <div className="flex justify-center my-4">
                                        {user?.tab_update_requested ? (
                                            <div className="rounded-full font-bold text-xs text-white bg-transparent border-1 border-gray-100 shadow-md px-4 py-2 flex items-center">
                                                ✓ Update Requested
                                            </div>
                                        ) : !showTabUpdateRequest ? (
                                            <Button 
                                                className="rounded-full font-bold text-xs text-white bg-emerald-600 shadow-md hover:bg-blue-600" 
                                                size="sm" 
                                                rounded="full"
                                                onPress={() => {
                                                    setShowTabUpdateRequest(true);
                                                    setTimeout(() => paymentAccountInputRef.current?.focus(), 0);
                                                }}
                                            >
                                                Request Update
                                            </Button>
                                        ) : (
                                            <div className="flex w-full justify-center items-center">
                                                <Input
                                                    ref={paymentAccountInputRef}
                                                    placeholder="venmo, paypal, or $cashtag"
                                                    variant="bordered"
                                                    radius="full"
                                                    size="sm"
                                                    value={paymentAccount}
                                                    onValueChange={setPaymentAccount}
                                                    className="w-48"
                                                    classNames={{
                                                        input: "text-black",
                                                        label: "text-sm text-black group-data-[filled=true]:-translate-y-4",
                                                        trigger: "min-h-unit-16",
                                                        listboxWrapper: "max-h-[400px]",
                                                        inputWrapper: ["pr-0", "bg-white", "rounded-r-none"],
                                                        errorMessage: "italic ml-4"
                                                    }}
                                                />
                                                <Button 
                                                    radius="full"
                                                    classNames={{ base: "rounded-l-none" }}
                                                    className="rounded-l-none font-bold text-xs text-white bg-emerald-600 shadow-md hover:bg-emerald-700" 
                                                    size="sm"
                                                    onPress={async () => {
                                                        try {
                                                            await updatePaymentAccount(user?.user_id, paymentAccount);
                                                            setPaymentAccount('');
                                                            setShowTabUpdateRequest(false);
                                                        } catch (error) {
                                                            console.error('Error updating payment account:', error);
                                                        }
                                                    }}
                                                >
                                                    Submit
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Payment Links */}
                                <div>
                                    <div className="justify-content-center mt-6">
                                        <div className="flex justify-between">
                                            <Link
                                                className={PAYMENT_CONFIG.paypal.className}
                                                target="_blank"
                                                to={paymentUrls.paypal || '#'}
                                                rel="noopener noreferrer"
                                                aria-label="Pay with PayPal"
                                            />
                                            <Link
                                                className={PAYMENT_CONFIG.cashapp.className}
                                                target="_blank"
                                                to={paymentUrls.cashapp || '#'}
                                                rel="noopener noreferrer"
                                                aria-label="Pay with CashApp"
                                            />
                                            <Link
                                                className={PAYMENT_CONFIG.venmo.className}
                                                target="_blank"
                                                to={paymentUrls.venmo || '#'}
                                                rel="noopener noreferrer"
                                                aria-label="Pay with Venmo"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Total Donations */}
                                <div className="pt-4">
                                    <div className="text-lg font-bungee text-center">
                                        Total Donations so far:
                                        <span className="pl-2 text-emerald-400">
                                            ${tabData?.tab?.total_donated || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BartabNav