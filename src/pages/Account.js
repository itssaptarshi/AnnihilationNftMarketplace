import React from 'react';
import { useState, useEffect } from 'react';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useMoralis } from "react-moralis";
import { useMoralisWeb3Api } from "react-moralis";
import { Tabs, Tab } from "react-bootstrap";
import NFTList2 from '../components/ui/NFTList2';
import img1 from "../images/blog-1-760x560.jpg";
import img2 from "../images/blog-2-760x560.jpg";
import img3 from "../images/blog-3-760x560.jpg";
import Moralis from 'moralis';

const nft_list = [
    {
        "item_id":1,
        "name":"Item One",
        "img": img1,
        "price": 10.3,
    },
    {
        "item_id":2,
        "name":"Item Two",
        "img": img2,
        "price": 8.023,
    },
    {
        "item_id":3,
        "name":"Item Three",
        "img": img3,
        "price": 6.2,
    },
    {
        "item_id":4,
        "name":"Item Four",
        "img": img2,
        "price": 0.6,
    },
];



const Account = () => {
    const [nftList, setNFTList] = useState([]);
    const [collectionName, setCollecionName] = useState([])
    const [tokenAddress,setTokenAddress] = useState([])
    const [tokenId,setTokenId] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useMoralis();
    const Web3Api = useMoralisWeb3Api();
    let addr = user.get('ethAddress')
    const [optionsValue, setOptionsValue] = useState([]);

    let data = [];
    let data2 = [];
    let data3 = [];
    let data4 = [];
    let data5 = [];
    let length;




    const userNft = async() =>{
        try{
            setLoading(true);
        
        const options = { address: addr , chain: "rinkeby" };
        const NFTs = await Moralis.Web3API.account.getNFTs(options);

        if (NFTs.result) {
            console.log(NFTs);
           // Convert the result metadata to an array
           const convertMetadata = NFTs.result.map((nft) => {
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
          setLoading(true);
          userNft()
        //   setNFTList(data);
          setLoading(false);
        };
    
        fetchPosts();
      }, []);

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
                                    <button onClick={userNft}>Click</button>
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