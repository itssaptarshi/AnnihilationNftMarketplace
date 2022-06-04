import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Moralis from "moralis";

import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Account from "./pages/Account";
import Collection from "./pages/Collection";
import NFT_Details from "./pages/NFT_Details";

import { useMoralis, useMoralisWeb3ApiCall, useMoralisWeb3Api } from "react-moralis";




function App() {
      
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/collection/:collectionAddress" element={<Collection />} />
          <Route path="/collection/:collectionAddress/nft/:nftAddress" element={<NFT_Details />} />
          
          <Route path="/account" element={<Account />} />
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
