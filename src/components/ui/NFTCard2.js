import React, { useState , useEffect} from 'react';
import { BigNumber} from 'ethers';
import { Link } from 'react-router-dom';
import {useMoralisDapp} from '../MoralisDappProvider/MoralisDappProvider'
import { useWeb3ExecuteFunction ,useMoralisQuery} from "react-moralis";
import { useMoralis } from "react-moralis";
import { Badge } from 'react-bootstrap';




const NFTCard = ({nft, collectionName, tokenAddress,tokenId,test}) => {
    const { Moralis } = useMoralis();
    const [nftToBuy,setNftToBuy] = useState(null);
    const [nftToSell, setNftToSell] = useState(null);
    const { chainId, marketAddress, contractABI } = useMoralisDapp();
    const contractProcessor = useWeb3ExecuteFunction();
    const contractABIJson = contractABI;
    const listItemFunction = "createMarketItem";
    const [cost,setCost] = useState();
    const decimals = 18;
    const queryMarketItems = useMoralisQuery("CreatedAb");
    const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      "objectId",
      "createdAt",
      "price",
      "nftContract",
      "itemId",
      "sold",
      "tokenId",
      "seller",
      "owner",
      "confirmed",
    ])
  );
  let nftData = [];
  const [loading, setLoading] = useState(false);

  
    async function list(nft,cost){
      const p = cost * ("1e" + 18);
      const ops = {
        contractAddress: marketAddress,
        functionName: listItemFunction,
        abi: contractABIJson,
        params: {
          nftContract: nft.token_address,
          tokenId: nft.token_id,
          price: String(p),
        },
      };
    

    contractProcessor.fetch({
        params: ops,
        onSuccess: () => {
          console.log("success");
          alert("success")
          
        },
        onError: (error) => {
          console.log(error)
        },
      });
    }

    async function approveAll(nft) {
      const ops = {
        contractAddress: nft.token_address,
        functionName: "setApprovalForAll",
        abi: [{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"}],
        params: {
          operator: '0xD937e4C40a0001E50282476a636535fDF772bC5c',
          approved: true
          
        },
      };
      await contractProcessor.fetch({
        params: ops,
        gasLimit: 250000,
        onSuccess: () => {
          console.log("Approval Received");
        //   setLoading(false);
        //   setVisibility(false);
        //   succApprove();
        console.log(tokenAddress)
        },
        onError: (error) => {
        //   setLoading(false);
        //   failApprove();
        console.log(error)
        },
      });
}



  
      useEffect(() => {

        const fetchPosts = async () => {
          setLoading(true);
          // testCase()
        //   setNFTList(data);
          setLoading(false);
        };
    
        fetchPosts();
      }, []);





    const handleSellClick=(nft)=>{
        setNftToSell(nft);
        console.log(nftToSell.token_address)
        list(nft,cost)

    }

    function resolveLink(url){
        if (!url || !url.includes("ipfs://")) return url;
            return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
        };
    
        let img = resolveLink(nft.metadata.image)
        //  console.log(nft.image)

    return (
        <div>
            
            <div className="mpl-product-item nft-card">
                <Link to={ `/nft/${nft.token_id}` } className="mpl-product-image">
                    <div className="mpl-image">
                      <div className='nft-card-image-div'>
                        <img src={img} alt="" className='nft-img' />
                      </div>
                        
                    </div>
                </Link>
                <div className="nftCardDescription">
                    <div className='row'>
                        <div className='col-md-8'>
                            <span className='collectionName text-mute'>{nft.name}</span>
                            <h6> <Link to={ `/nft/${nft.token_id}` } >{nft.metadata.name}</Link> </h6>
                        </div>
                        <div className='col-md-4 text-right'>
                            <span className='nft-card-price'>
                                Price: {nft.price} ANCE
                            </span>
                            {/* <button onClick={()=>{showData(nft)}}>hit</button> */}
                            {/* <button onClick={testCase}>Hit</button> */}
                            {/* {getMarketItem(nft) && <button onClick={()=>{handleBuyClick(nft)}}>buy</button>} */}
                            <input placeholder='price' onChange={e =>setCost(e.target.value)}/>
                            <button onClick={()=>{approveAll(nft)}}>Approve</button>
                            <button onClick={()=>handleSellClick(nft,cost)}>Sell</button>

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default NFTCard;