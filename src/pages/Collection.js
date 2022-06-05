import React, { useState, useEffect } from 'react';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import img1 from "../images/blog-1-760x560.jpg";
import img2 from "../images/blog-2-760x560.jpg";
import img3 from "../images/blog-3-760x560.jpg";
import NFTCard from '../components/ui/NFTCard';
import Moralis from 'moralis';
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useWeb3ExecuteFunction } from "react-moralis";



import NFTList from '../components/ui/NFTList';
import { connected } from 'process';
import { useParams } from 'react-router-dom';



const Collection = () => {
    const { Moralis, isInitialized, isInitializing } = useMoralis();
    // const Web3Api = useMoralisWeb3Api();
    const {collectionAddress} = useParams();

    const [nftList, setNFTList] = useState([]);
    const [optionsValue, setOptionsValue] = useState([]);
    const [test,setTest] = useState([])
    const [collectionName, setCollecionName] = useState([])
    const [tokenAddress,setTokenAddress] = useState([])
    const [tokenId,setTokenId] = useState([]);
    const [loading, setLoading] = useState(false);
    const contractProcessor = useWeb3ExecuteFunction();


    const options = { address: "0x8cb4d0957c365a2f8eb9f00330b931ac917407ec", chain: "rinkeby" };
    // const options = { address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", chain: "eth" };
    
    async function collectionNFT(options){
        try {
            setLoading(true);
            const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
            console.log(NFTs)
            if (NFTs.result) {
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

    }

    useEffect(() => {
        if (isInitialized) {
            collectionNFT(options);
        }
    }, [isInitialized]);

      
    // console.log(optionsValue);
    return (
        <div>
            <Header />
            <div className="content-wrap">
                <div className="mpl-box-md">
                    <div className="container text-center">
                        <h2>Collection</h2>
                        <div className='mb-3'>
                           <h3><span className='badge badge-warning text-dark'> Address: 0x133dg6fg14....cb3dgfhgf </span></h3>
                        </div>
                        <div className='row justify-content-center'>
                            <div className='col-md-2'>
                                <div className='mpl-feature p-10'>
                                    <div className='h3 m-5'>
                                        {optionsValue.total}
                                    </div>
                                    <div className='text-mute'>
                                            Items
                                        </div>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div className='mpl-feature p-10'>
                                    <div className='h3 m-5'>
                                        1
                                    </div>
                                    <div className='text-mute'>
                                            Owner
                                        </div>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div className='mpl-feature p-10'>
                                    <div className='h3 m-5'>
                                        ---
                                    </div>
                                    <div className='text-mute'>
                                            Floor Price
                                        </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                    
                </div>
                <div className='mpl-box-md pt-0'>  
                    <div className='container'>
                        <nav>
                            <div className="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
                                <button className="nav-link active" id="nav-items-tab" data-bs-toggle="tab" data-bs-target="#nav-items" type="button" role="tab" aria-controls="nav-items" aria-selected="true"><i className='fa fa-border-all'></i> Items</button>
                                <button className="nav-link" id="nav-activity-tab" data-bs-toggle="tab" data-bs-target="#nav-activity" type="button" role="tab" aria-controls="nav-activity" aria-selected="false"><i className='fa fa-chart-line'></i> Activity</button>
                            </div>
                        </nav>
                        <hr />
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-items" role="tabpanel" aria-labelledby="nav-items-tab">
                            <div className='mb-20'>
                                <div className='row  justify-content-end'>
                                    <div className='col-md-4'>
                                        <select className='form-select form-select-lg' aria-label=".form-select-lg" name="filter_by" id='filter_by'>
                                            <option value="low_to_high">Price: Low to High</option>
                                            <option value="high_to_low">Price: High to Low</option>
                                            <option value="recently_created">Recently Created</option>
                                        </select>
                                        <span className='form-control-bg'></span>
                                    </div>
                                </div>
                                
                            </div>
                                {/* <button onClick={collectionNFT}>Click2</button> */}
                                <NFTList nftList={nftList} loading={loading} collectionName={collectionName} tokenAddress={tokenAddress} tokenId={tokenId} test={test}/>
                            
                            </div>
                            <div className="tab-pane fade" id="nav-activity" role="tabpanel" aria-labelledby="nav-activity-tab">
                                <p>Here will be the activity table..</p>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default Collection;