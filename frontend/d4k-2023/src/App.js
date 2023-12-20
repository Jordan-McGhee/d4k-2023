import React, { Suspense,  } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {NextUIProvider} from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

import HomePage from "./pages/HomePage"

// LAYOUTS
import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import NotFoundLayout from "./components/layouts/NotFoundLayout";
import { ToastContainer, Zoom } from 'react-toastify';

// LAZY IMPORTS
const FAQ = React.lazy(() => import("./pages/FAQ"))
const Menu = React.lazy(() => import("./pages/Menu"))
const Order = React.lazy(() => import("./pages/Order"))
const Queue = React.lazy(() => import("./pages/Queue"))
const Donate = React.lazy(() => import("./pages/Donate"))
const Leaderboard = React.lazy(() => import("./pages/Leaderboard"))
const Admin = React.lazy(() => import("./pages/Admin"))
const AdminBarTabs = React.lazy(() => import("./pages/AdminBarTab"))
const AdminUsers = React.lazy(() => import("./pages/AdminUsers"))
const AdminAnalytics = React.lazy(() => import("./pages/AdminAnalytics"))
const LargeLeaderBoard = React.lazy(() => import("./components/leaderboard/Large/LargeLeaderBoard"))
const NotFound = React.lazy(() => import("./pages/NotFound"))

function App() {
  let routes = (
    <Routes>

      {/* USER LAYOUT PAGES */}
      <Route element = { <UserLayout />}>
          <Route path = "/" element = { <HomePage />} />
          <Route path= "/faq" element = { <FAQ /> } />
          <Route path = "/menu" element = { <Menu />} />
          <Route path = "/order" element = { <Order />} />
          <Route path = "/queue" element = { <Queue />} />
          <Route path = "/donate" element = { <Donate />} />
          <Route path = "/leaderboard" element = { <Leaderboard />} />
      </Route>

      {/* ADMIN LAYOUT AND PAGES */}
      <Route element = { <AdminLayout />} >
      <Route path = "/admin" element = { <Navigate to='/adminOrders' /> } />
        <Route path = "/adminOrders" element = { <Admin /> } />
        <Route path = "/adminTabs" element = { <AdminBarTabs />} />
        <Route path = "/adminUsers" element = { <AdminUsers/>} />
        <Route path = "/adminAnalytics" element = { <AdminAnalytics/>} />

      </Route>

      {/* NOT FOUND LAYOUT */}
      <Route element = { <NotFoundLayout />}>
        <Route path = "*" element = { <NotFound />} />
      </Route>
      
      {/* JUMBOTRON */}
      <Route path="/jumbotron" element = { <LargeLeaderBoard /> }/>

    </Routes>
  )

  return (
    <NextUIProvider>
      <Suspense fallback = {
        <div>
          <Spinner color="success" className="fixed top-2/4" style={{left:'calc(50% - 20px)'}} size="lg" />
        </div>
      }>
        { routes }
      </Suspense>
      <ToastContainer transition={Zoom} />
    </NextUIProvider>
  );
}

export default App;
