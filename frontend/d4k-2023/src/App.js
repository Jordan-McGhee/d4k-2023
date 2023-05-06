import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import './App.css';

// IMPORTS
// import Admin from "./pages/Admin"
// import Tab from "./pages/Tab"
// import FAQ from "./pages/FAQ"
import HomePage from "./pages/HomePage"
// import Menu from "./pages/Menu"
// import Order from "./pages/Order"
// import Queue from "./pages/Queue"
// import Leaderboard from "./pages/Leaderboard"
// import LargeLeaderBoard from "./components/leaderboard/Large/LargeLeaderBoard"
// import Donate from "./pages/Donate"
// import PayTab from "./pages/PayTab"
// import NotFound from "./pages/NotFound"

// LAYOUTS
import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import NotFoundLayout from "./components/layouts/NotFoundLayout";
import LoadingSpinner from "./components/UIElements/LoadingSpinner";

// LAZY IMPORTS
const FAQ = React.lazy(() => import("./pages/FAQ"))
const Menu = React.lazy(() => import("./pages/Menu"))
const Order = React.lazy(() => import("./pages/Order"))
const Queue = React.lazy(() => import("./pages/Queue"))
const Donate = React.lazy(() => import("./pages/Donate"))
const PayTab = React.lazy(() => import("./pages/PayTab"))
const Leaderboard = React.lazy(() => import("./pages/Leaderboard"))
const Admin = React.lazy(() => import("./pages/Admin"))
const Tab = React.lazy(() => import("./pages/Tab"))
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
          <Route path= "/pay" element = { <PayTab /> } />
          <Route path = "/leaderboard" element = { <Leaderboard />} />
      </Route>

      {/* ADMIN LAYOUT AND PAGES */}
      <Route element = { <AdminLayout />} >
        <Route path = "/admin" element = { <Admin /> } />
        <Route path = "/tabs" element = { <Tab />} />
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
    <div>
      <Suspense fallback = {
        <div>
          <LoadingSpinner />
        </div>
      }>
        { routes }
      </Suspense>
    </div>
  );
}

export default App;
