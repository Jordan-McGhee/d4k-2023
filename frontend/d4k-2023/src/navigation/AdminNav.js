import React from "react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {

    return (
        <div className="nav-container bg-blue-900 p-6 top-0 fixed w-full">

            <div className="flex justify-between">
                <NavLink to="/" className=''>
                    <h1 className="text-4xl font-bold text-white">D4K ADMIN</h1>
                </NavLink>                
                <div className="flex">
                    <NavLink to="/adminOrders" className={ ({isActive}) => isActive ? "my-2 uppercase text-white text-2xl mr-4 border-b border-white font-semibold" : "my-2 uppercase text-white/50 text-2xl mr-4"}>
                        <p>Orders</p>
                    </NavLink>
                    <NavLink to="/adminTabs" className={ ({isActive}) => isActive ? "my-2 uppercase text-white text-2xl mr-4 border-b border-white font-semibold" : "my-2 uppercase text-white/50 text-2xl mr-4"}>
                        <p>Tabs</p>
                    </NavLink>
                    <NavLink to="/adminUsers" className={ ({isActive}) => isActive ? "my-2 uppercase text-white text-2xl mr-4 border-b border-white font-semibold" : "my-2 uppercase text-white/50 text-2xl mr-4"}>
                        <p>Users</p>
                    </NavLink>
                    <NavLink to="/adminAnalytics" className={ ({isActive}) => isActive ? "my-2 uppercase text-white text-2xl mr-4 border-b border-white font-semibold" : "my-2 uppercase text-white/50 text-2xl mr-4"}>
                        <p>Analytics</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default AdminNav