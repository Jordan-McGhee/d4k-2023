// import react, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import './App.css';

// IMPORTS
import Admin from "./pages/Admin"
import FAQ from "./pages/FAQ"
import HomePage from "./pages/HomePage"
import Menu from "./pages/Menu"
import Order from "./pages/Order"
import Queue from "./pages/Queue"
import Leaderboard from "./pages/Leaderboard"
import MainNav from "./navigation/MainNav"

import backgroundImage2 from "./images/snowflake-bg-vertical.png"

function App() {
  let routes = (
    <Routes>
      <Route path = "/" element = { <HomePage />} />
      <Route path = "/admin" element = { <Admin /> } />
      <Route path= "/faq" element = { <FAQ /> } />
      <Route path = "/menu" element = { <Menu />} />
      <Route path = "/order" element = { <Order />} />
      <Route path = "/queue" element = { <Queue />} />
      <Route path = "/leaderboard" element = { <Leaderboard />} />
    </Routes>
  )

  return (
    <div className="App bg-local" style={{backgroundImage: `url(${backgroundImage2})`}}>
      <MainNav />
      <div className="min-h-screen bg-red-900/75">
        <div className="main-container m-auto p-5">
          { routes }
        </div>
      </div>

      <img alt="xmas town" src="https://christmashq.imgix.net/assets/images/christmas-hq.png?fit=crop&amp;q=50&amp;w=1280&amp;h=320&amp;auto=format" className="absolute bottom-0 sticky"/>
      
    </div>
  );
}

export default App;
