import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCashRegister, faCheck, faMagnifyingGlass, faDollar, faX, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import ErrorModal from "../components/UIElements/ErrorModal"
import convertDate from "../Conversions/convertDateTime";
import { Spinner, Input, Button, ButtonGroup, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Modal, ModalBody, ModalContent , ModalHeader, ModalFooter,
} from "@nextui-org/react";

import { Chart } from "react-google-charts";


import { UserApi }  from "../api/userApi";

const Tab = () => {
    const [ allUsers, setAllUsers] = useState([])
    const { updateUserDonations, getAllUsers, createUser, getUserIdByUsername, isUserApiLoading, hasError, clearError } = UserApi()



    useEffect(() => {
        const getUsers = async () => {
            try {
                const responseData = await getAllUsers()
                setAllUsers(responseData)
                
            } catch (error) {
                console.log(error)
            }
        }
        getUsers()
    }, [ ])

    const refreshUsers = async () => {
        try {
            const responseData = await getAllUsers()
            setAllUsers(responseData)
            
        } catch (error) {
            console.log(error)
        }
    }

    const data = [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350],
      ];
      
      const options = {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
      };

    return (
        <>
            <div className="w-full m-auto">
                <ErrorModal error = { hasError } onClear = { clearError } />
                { (isUserApiLoading) && <Spinner color="success" className="fixed top-2/4 z-50 w-50" style={{left:'calc(50% - 20px)'}} size="lg" /> }
                <div>
                    <div className="rounded-lg shadow-md">
                    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tab