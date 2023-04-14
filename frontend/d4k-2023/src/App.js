// import react, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import './App.css';

// IMPORTS
import Admin from "./pages/Admin"
import Tab from "./pages/Tab";
import FAQ from "./pages/FAQ"
import HomePage from "./pages/HomePage"
import Menu from "./pages/Menu"
import Order from "./pages/Order"
import Queue from "./pages/Queue"
import Leaderboard from "./pages/Leaderboard"
import LargeLeaderBoard from "./components/leaderboard/Large/LargeLeaderBoard"
import Donate from "./pages/Donate";
import PayTab from "./pages/PayTab";
import NotFound from "./pages/NotFound";

// LAYOUTS
import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import NotFoundLayout from "./components/layouts/NotFoundLayout";

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
      { routes }
    </div>
  );
}

export default App;
