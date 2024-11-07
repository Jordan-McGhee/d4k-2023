import React from "react";
import { NavLink } from "react-router-dom";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

const AdminNav = () => {

    return (
        <div className="nav-container p-6 top-0 fixed w-full">

            <Navbar>
      <NavbarContent className="flex gap-4" justify="center">
        <NavbarItem>
            <NavLink to="/adminOrders" className={ ({isActive}) => isActive ? "my-2 uppercase text-blue-800   mr-4 border-b border-white font-semibold" : "my-2 uppercase text-gray/50  mr-4"}>
                Orders
            </NavLink>
        </NavbarItem>
        <NavbarItem>
            <NavLink to="/adminTabs" className={ ({isActive}) => isActive ? "my-2 uppercase text-blue-800   mr-4 border-b border-white font-semibold" : "my-2 uppercase text-gray/50  mr-4"}>
                Tabs
            </NavLink>
        </NavbarItem>
        <NavLink to="/adminUsers" className={ ({isActive}) => isActive ? "my-2 uppercase text-blue-800  mr-4 border-b border-white font-semibold" : "my-2 uppercase text-gray/50  mr-4"}>
            Users
        </NavLink>
        <NavbarItem>

      <NavLink to="/adminAnalytics" className={ ({isActive}) => isActive ? "my-2 uppercase  text-blue-800  mr-4 border-b border-white font-semibold" : "my-2 uppercase text-gray/50  mr-4"}>
        Analytics
        </NavLink>
        </NavbarItem>

      </NavbarContent>
    </Navbar>
            
        </div>
    )
}

export default AdminNav