import { Route, Routes } from "react-router-dom";
import "./App.css";
import BBCNews from "./templates/BBCNews/BBCNews";
import BitcoinNews from "./templates/BitcoNews/BitCoinNews";
import HomePage from "./templates/HomePage/HomePage";
import TrumpHomepage from "./templates/HomepageNewsSummary/Trump/TrumpHomepage";
import Navbar from "./templates/Navbar/Navbar";
import TechCrunchNews from "./templates/TechCrunchNews/TechCrunchNews";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
     <Route path='/' element={<HomePage/>}/>
     <Route path='/bbc-news' element={<BBCNews/>}/>
     <Route path='/trump-news' element={<TrumpHomepage/>}/>
     <Route path='/bitcoin-news' element={<BitcoinNews/>}/>
     <Route path='/techcrunch-news' element={<TechCrunchNews/>}/>

    </Routes>
    </>
  );
}

export default App;
