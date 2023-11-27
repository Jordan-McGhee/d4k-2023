import React, { useEffect, useState } from "react";
import AdminNav from "../../navigation/AdminNav";
import { Outlet } from "react-router-dom";
import { Button, Input, Spinner} from "@nextui-org/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { AdminApi }  from "../../api/adminApi";

const AdminLayout = () => {
    const { login, isLoading } = AdminApi()
    const [ isInvalid, setIsInvalid ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ showAdmin, setShowAdmin ] = useState(false)

    const handleSubmitPassword = async () => {
        if (isLoading) return
        localStorage.setItem('d4kpassword', password)
        let verified = await login(password)
        if(verified){
            setIsInvalid(false)
            setShowAdmin(true)
        }else{
            setIsInvalid(true)
        }
    }

    useEffect(() => {
        const submitPassword = async (pwd) => {
            if (isLoading) return
            let verified = await login(pwd)
            if(verified){
                setIsInvalid(false)
                setShowAdmin(true)
            }else{
                setIsInvalid(true)
            }
        }
        let storedPassword = localStorage.getItem('d4kpassword')
        if (storedPassword) {
            setPassword(storedPassword)
            submitPassword(storedPassword)
        }
    }, [])


    return (
        <div>{ showAdmin &&
            <AdminNav />
            }
            { !showAdmin &&
                    <div className="fixed top-1/4 px-10 flex duration-200">
                            <Input
                            label="password"
                            variant="bordered"
                            radius="full"
                            maxLength={30}
                            value={password}
                            isInvalid={isInvalid}
                            onValueChange={setPassword}
                            color={isInvalid ? "danger" : "success"}
                            className="pb-5 max-w-md"
                            classNames={{
                                label: "text-xl group-data-[filled=true]:-translate-y-4",
                                trigger: "min-h-unit-16",
                                listboxWrapper: "max-h-[400px]",
                                inputWrapper: ["pr-0", "bg-white", "rounded-r-none"],
                                errorMessage: "italic ml-4"
                            }}
                            endContent={
                                isLoading && <Spinner color="success" />
                            }
                        />
                        <span className="flex">
                            <Button
                                size="md"
                                isIconOnly
                                radius="full"
                                className="h-14 bg-emerald-600 text-slate-200 text-xl border-t-2 border-b-2 rounded-l-none"
                                type="button"
                                onPress={handleSubmitPassword}
                            ><FontAwesomeIcon icon={faCheck} />
                            </Button>
                        </span>
                    </div>
            }
            {showAdmin && 
            <div className="App bg-local overflow-hidden mt-24">
                <div className="bg-slate-300">
                    <div className="main-container m-auto p-5">
                        <Outlet />
                        
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default AdminLayout