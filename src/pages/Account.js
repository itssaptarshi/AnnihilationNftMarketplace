import React from 'react';
import { useState, useEffect } from 'react';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useMoralis } from "react-moralis";
import { useMoralisWeb3Api } from "react-moralis";
import { Alert } from "react-bootstrap";
import NFTList2 from '../components/ui/NFTList2';
import img1 from "../images/blog-1-760x560.jpg";
import img2 from "../images/blog-2-760x560.jpg";
import img3 from "../images/blog-3-760x560.jpg";
import Moralis from 'moralis';
import GameLogin from '../components/ui/GameLogin';
import GameSyncNFT from '../components/GameSyncNFT';
import Loading from '../components/ui/Loading/Loading';


const Account = () => {
    const Web3Api = useMoralisWeb3Api();
    const { isInitialized, user } = useMoralis();
    
    const [walletAddress, setWalletAddress] = useState("");
    const [nftList, setNFTList] = useState([]);
    const [collectionName, setCollecionName] = useState([])
    const [tokenAddress,setTokenAddress] = useState([])
    const [tokenId,setTokenId] = useState([]);
    const [loading, setLoading] = useState(false);
    const [collectedMessage, setCollectedMessage] = useState(null);

    const handleLoading = loading => setLoading(loading);
    const handleCollectedMessage = message => setCollectedMessage(message);
    
    
    const [optionsValue, setOptionsValue] = useState([]);
    const UserData = JSON.parse(localStorage.getItem("UserData"));
    const [gameLoginState, setGameLoginState] = useState(false);
    const handleGameLoginState = loginState => setGameLoginState(loginState);
    
    // console.log("UserData From Account");
    // console.log(UserData);
    
    // if(!isInitialized){
    //     setLoading(true);
    // }else{
    //     let addr = user.get('ethAddress');
    //     setWalletAddress(addr);
    //     setLoading(false);
        
    // }


    

    const userNft = async() =>{
        try{
            setLoading(true);
        // if (isInitialized) {
        //     let addr = user.get('ethAddress');
        // }
        const addr = user.get('ethAddress');
        const options = { address: addr , chain: "bsc testnet" };
        const NFTs = await Moralis.Web3API.account.getNFTs(options);

        if (NFTs.result) {
            console.log(NFTs);
           // Convert the result metadata to an array
           const convertMetadata = NFTs.result.filter( nft => nft.metadata !==null).map((nft) => {
               nft.metadata = JSON.parse(nft.metadata);
               return nft;
           });
           setOptionsValue({
               "cursor":NFTs.cursor,
               "total":NFTs.total,
               "limit":NFTs.page_size,
               "current_page_index":NFTs.page,
           })
           setNFTList(convertMetadata);
   
           setLoading(false);
       }
    } catch (error) {
       alert(error);
       setLoading(false);

   }


   // Change Loading
   











        // console.log(NFTs)
        // for(let i=0;i<10;i++){
        //     console.log(NFTs.result[i].token_address)
        //     console.log(NFTs.result[i].token_id)
        // }
        // length = NFTs.total
        // for(let i=0; i< length; i++){
        //     let response = NFTs.result[i];
        //     data5[i] = response
        // }
        // setNFTList(data5)
        // console.log(nftList)
        // data2 = NFTs.result[0].name
        // data3 = NFTs.result[0].token_address
        // // data4 = NFTs.result[0].token_id
        // for(let i=0;i<length;i++){
        //     let idData = NFTs.result[i].token_id
        //     data4[i]= idData
        // }
        // setCollecionName(data2)
        // // console.log(data2)
        // setTokenAddress(data3)
        // // console.log(data3)
        // setTokenId(data4)
        // console.log(tokenId)
        // for(let i=0; i< 20; i++){
        //     let response = await fetch(NFTs.result[i].token_uri);
        //     let jsonData = await response.json();
        //     data[i] = jsonData
        //     // console.log(data[i])
        //     // console.log(i)
        // }
        // setNFTList(data)
        // // console.log(nftList)
    }

    useEffect(() => {

        const fetchPosts = async () => {
        //   setLoading(true);
        if(isInitialized){
            userNft()
            if (typeof UserData === "undefined" || UserData===null ) {
                setGameLoginState(false);
            }else{
                setGameLoginState(true)
            }
        }
          
        //   setNFTList(data);
        //   setLoading(false);
        };
    
        fetchPosts();
      }, [isInitialized, gameLoginState]);

    if (loading || !isInitialized) {
        // return <h2 className='text-center'>Loading...</h2>;
        return <Loading />;
    }

    return (
        <div>
            <Header />
            <div className="content-wrap">
                <div className="mpl-box-md">
                    <div className="container text-center">
                        <h2>AccountID</h2>
                    </div>
                    <div className="container">
                        {/* <button onClick={profile}>Hello</button> */}
                        {/* <NFTBalance address={user.get('ethAddress')} chain='rinkeby'/> */}
                        <div className='mt-3 mb-3'>
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-collected-tab" data-bs-toggle="tab" data-bs-target="#nav-collected" type="button" role="tab" aria-controls="nav-collected" aria-selected="true"><i className='fa fa-cart-plus'></i> Collected</button>
                                    <button className="nav-link" id="nav-created-tab" data-bs-toggle="tab" data-bs-target="#nav-created" type="button" role="tab" aria-controls="nav-created" aria-selected="false"><i className='fa fa-paint-roller'></i> Created</button>
                                    <button className="nav-link" id="nav-activity-tab" data-bs-toggle="tab" data-bs-target="#nav-activity" type="button" role="tab" aria-controls="nav-activity" aria-selected="false"><i className='fa fa-history'></i> Activity</button>
                                </div>
                            </nav>
                            <hr />
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-collected" role="tabpanel" aria-labelledby="nav-collected-tab">
                                    
                                    {
                                    (collectedMessage!==null) && <div className="alert alert-warning alert-dismissible" role="alert"> <button type="button" className="btn-close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true" className='icon'>&times;</span> </button> {collectedMessage} </div>
                                    }
                                    <div className="row mb-10">
                                        <div className="col-md-7">
                                            
                                            <div>
                                                {
                                                (gameLoginState===true)?<GameSyncNFT nftList={nftList} handleLoading={handleLoading} handleMessage={handleCollectedMessage} handleGameLoginState={handleGameLoginState} />
                                                : <GameLogin handleLoading={handleLoading} handleGameLoginState={handleGameLoginState} />
                                                }
                                            </div>
                                            
                                        </div>
                                        <div className="col-md-5">
                                        <button onClick={userNft}>Click</button>
                                        </div>
                                    </div>
                                    <NFTList2 nftList={nftList} collectionName={collectionName} tokenAddress={tokenAddress} tokenId={tokenId}/>
                                </div>
                                <div className="tab-pane fade" id="nav-created" role="tabpanel" aria-labelledby="nav-created-tab">
                                    <p>Here will be the created nft list</p>
                                </div>
                                <div className="tab-pane fade" id="nav-activity" role="tabpanel" aria-labelledby="nav-activity-tab">
                                    <p>Here will be the activity table..</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                
                </div>

            </div>
            <Footer />

        </div>
    );
};

export default Account;