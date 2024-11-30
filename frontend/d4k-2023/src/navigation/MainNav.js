import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCandyCane, faCocktail, faGift, faIgloo, faPeopleGroup, faMedal } from "@fortawesome/free-solid-svg-icons";

import {Link, Image, Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarBrand} from "@nextui-org/react";

const MainNav = (props) => {

    let localStorageUsername = localStorage.getItem('storedUsername')
    const menuItems = [
      {
          title: "Info",
          link: "/faq",
          icon: faCandyCane
      },
      {
          title: "Menu",
          link: "/menu",
          icon: faCocktail
      },
      {
          title: "Order",
          link: "/order",
          icon: faGift
      },
      {
          title: "Queue",
          link: "queue",
          icon: faPeopleGroup
      },
      {
          title: "Leaderboard",
          link: "leaderboard",
          icon: faMedal
      }
  ]
    const [ hamburgerOpen, setHamburgerOpen ] = useState(false)

    const hamburgerHandler = () =>{
        setHamburgerOpen(!hamburgerOpen)
    }

    return (
        <>
 <Navbar className="nav-container bg-emerald-600 h-20" >
      {/* <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand> */}
      <NavbarBrand>
        <NavLink to="/"  className="absolute inline-flex hover:animate-ping">
        <Image className="" width={70} height={70} src="../images/santaicon.png"></Image> <span className="font-fugaz text-4xl text-slate-200 pt-4">D4K</span>
        </NavLink>
        <NavLink className="inline-flex">
      <Image className="" width={70} height={70} src="../images/santaicon.png"></Image> <span className="font-fugaz text-4xl text-slate-200 pt-4">D4K</span>
      </NavLink>
      </NavbarBrand>
        <NavbarContent className="hidden sm:flex " justify="center">
              {menuItems.map((item, index) => (
              <NavbarItem key={`${item}-${index}`} className="text-xl font-bungee text-slate-200 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-white duration-200">
                  <NavLink to={item.link} 
                  className={ ({isActive}) => isActive ? "my-2 text-emerald-600 px-3 py-2 rounded-full  border-b bg-slate-200 border-white font-semibold" : "px-3 py-2 text-gray/50 "}>
                    <FontAwesomeIcon className="mx-1" icon={item.icon} />

                      {item.title}
                  </NavLink>
              </NavbarItem>
              ))}
        </NavbarContent>
    </Navbar>
        </>
    )
}

export default MainNav