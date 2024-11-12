import React from "react";
import { NavLink } from "react-router-dom";
import {Link, Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenuItem, NavbarMenu} from "@nextui-org/react";


const AdminNav = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [selectedMenuItem, setSelectedMenuItem] = React.useState(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1))
    const menuItems = [
        {
            title: "Orders",
            link: "/Admin/Orders"
        },
        {
            title: "Tabs",
            link: "/Admin/Tabs"
        },
        {
            title: "Users",
            link: "/Admin/Users"
        },
        {
            title: "Inventory",
            link: "/Admin/Inventory"
        },
        {
            title: "Analytics",
            link: "/Admin/Analytics"
        }
    ]
    return (
        <div className="nav-container p-3 top-0 fixed w-full">

    <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
            <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
            title="asdf"
            />
        </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {menuItems.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
                <NavLink to={item.link} className={ ({isActive}) => isActive ? "my-2 uppercase text-emerald-600 underline mr-4 border-b border-white font-semibold" : "my-2 uppercase text-gray/50  mr-4"}>
                    {item.title}
                </NavLink>
            </NavbarItem>
            ))}
      </NavbarContent>
      <NavbarContent    
      className="sm:hidden" justify="end">
        <NavbarItem>
          {selectedMenuItem}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
            {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}-mobile`}>
                <NavLink
                onClick={() => {setSelectedMenuItem(item.title)}}
                className={ ({isActive}) => isActive ? "w-full uppercase text-emerald-600 underline mr-4 border-b border-white font-semibold" : "my-2 uppercase text-gray/50  mr-4"}
                to={item.link}
                size="lg"
                >
                {item.title}
                </NavLink>
            </NavbarMenuItem>
            ))}
        </NavbarMenu>
    </Navbar>
            
        </div>
    )
}

export default AdminNav