import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Badge } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faUsers, faBox, faChartLine, faCocktail } from '@fortawesome/free-solid-svg-icons';
import { UserApi } from "../api/userApi";
import { OrderApi } from "../api/orderApi";


const AdminNav = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [selectedMenuItem, setSelectedMenuItem] = React.useState(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1))
    const [pendingUpdateCount, setPendingUpdateCount] = useState(0);
    const [nonDeliveredOrderCount, setNonDeliveredOrderCount] = useState(0);
    const { getPendingUpdateCount } = UserApi();
    const { getNonDeliveredOrderCount } = OrderApi();

    useEffect(() => {
        const fetchPendingUpdates = async () => {
            try {
                const data = await getPendingUpdateCount();
                setPendingUpdateCount(data.count);
            } catch (error) {
                console.error('Error fetching pending updates:', error);
            }
        };

        const fetchNonDeliveredOrders = async () => {
            try {
                const data = await getNonDeliveredOrderCount();
                setNonDeliveredOrderCount(data.count);
            } catch (error) {
                console.error('Error fetching non-delivered orders:', error);
            }
        };

        // Fetch both on mount
        fetchPendingUpdates();
        fetchNonDeliveredOrders();
        
        // Poll every 30 seconds to check for updates and orders
        const interval = setInterval(() => {
            fetchPendingUpdates();
            fetchNonDeliveredOrders();
        }, 30000);
        
        return () => clearInterval(interval);
    }, []);
    const menuItems = [
        {
            title: "Orders",
            link: "/Admin/Orders",
            icon: faClipboardList,
            badge: nonDeliveredOrderCount > 0 ? nonDeliveredOrderCount : null
        },
        {
            title: "Tabs",
            link: "/Admin/Tabs",
            icon: faCocktail,
            badge: pendingUpdateCount > 0 ? pendingUpdateCount : null
        },
        {
            title: "Users",
            link: "/Admin/Users",
            icon: faUsers
        },
        {
            title: "Inventory",
            link: "/Admin/Inventory",
            icon: faBox
        },
        {
            title: "Analytics",
            link: "/Admin/Analytics",
            icon: faChartLine
        }
    ]
    return (
        <div className="nav-container top-0 fixed w-full z-50 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg">
            <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-transparent" maxWidth="full">
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden text-white"
                    />
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-8" justify="center">
                    {menuItems.map((item, index) => (
                        <NavbarItem key={`${item}-${index}`}>
                            <Badge 
                                content={item.badge} 
                                color="danger" 
                                shape="circle"
                                isInvisible={!item.badge}
                                classNames={{
                                    badge: "font-bold text-xs"
                                }}
                            >
                                <NavLink 
                                    to={item.link} 
                                    className={({ isActive }) => 
                                        isActive 
                                            ? "flex items-center gap-2 px-4 py-2 rounded-lg text-emerald-400 font-semibold transition-all duration-300 bg-emerald-400/10 border-b-2 border-emerald-400" 
                                            : "flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                                    }
                                >
                                    <FontAwesomeIcon icon={item.icon} className="text-lg" />
                                    <span className="uppercase text-sm font-medium">{item.title}</span>
                                </NavLink>
                            </Badge>
                        </NavbarItem>
                    ))}
                </NavbarContent>

                <NavbarContent className="sm:hidden" justify="end">
                    <NavbarItem>
                        <span className="text-white font-semibold">{selectedMenuItem}</span>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu className="bg-slate-800 border-t border-slate-700">
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}-mobile`}>
                            <Badge 
                                content={item.badge} 
                                color="danger"
                                shape="circle"
                                isInvisible={!item.badge}
                                classNames={{
                                    badge: "font-bold text-xs"
                                }}
                            >
                                <NavLink
                                    onClick={() => { setSelectedMenuItem(item.title) }}
                                    className={({ isActive }) => 
                                        isActive 
                                            ? "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-400 font-semibold transition-all duration-300 bg-emerald-400/10" 
                                            : "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                                        }
                                    to={item.link}
                                >
                                    <FontAwesomeIcon icon={item.icon} className="text-lg" />
                                    <span className="uppercase text-sm font-medium">{item.title}</span>
                                </NavLink>
                            </Badge>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </div>
    )
}

export default AdminNav