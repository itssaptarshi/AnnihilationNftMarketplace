import React, { useEffect, useState } from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import img1 from "../images/blog-1-760x560.jpg";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { Link, useParams } from 'react-router-dom';
import { useNFTData } from '../components/support/Hooks';
import Moralis from 'moralis';
import {useMoralisDapp} from '../components/MoralisDappProvider/MoralisDappProvider'
import { useWeb3ExecuteFunction ,useMoralisQuery} from "react-moralis";
import NFTDetailsImage from '../components/ui/NFTDetailsImage';
import NFTAttributesList from '../components/ui/NFTDetails/NFTAttributesList';


const NFT_Details = () => {
    const {collectionAddress, nftAddress} = useParams();
    const { user} = useMoralis();
    const { Moralis } = useMoralis();
    const [nftToBuy,setNftToBuy] = useState(null);
    const [nftToSell, setNftToSell] = useState(null);
    const { chainId, marketAddress, contractABI } = useMoralisDapp();
    const contractProcessor = useWeb3ExecuteFunction();
    const contractABIJson = contractABI;
    const listItemFunction = "createMarketItem";
    const purchaseItemFunction = "createMarketSale";
    const [cost,setCost] = useState();
    const decimals = 18;
    let wAd;
    let price;
    let result = [];
    const queryMarketItems = useMoralisQuery("CreatedMarketItemTest");
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
    
    
    const [loading, setLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState();
    const [nftPrice, setNftPrice] = useState();
    const [attribute, setAttribute] = useState([]);
    const [p,setP] = useState()
    let data = [];
    const handleLoading = (value)=>{
        setLoading(value);
    }

    const getWAddress = () =>{
        if(user){
            wAd = user.get('ethAddress');
            setWalletAddress(wAd); 
        }
    }
    
    useEffect(() => {
        
        const fetchPosts = async () => {
            getMarketItem(NFT)
            setP(result.price / ("1e" + 18))


            //   setLoading(true);
            //   setLoading(false);
            if(loading!==false && NFT !== null){
                getWAddress();
                // test2(NFT);
            // getMarketItem(NFT);
            // handleBuyClick(NFT);
        }
        // const fetchPosts = async () => {
        //     setLoading(true);
        //     setLoading(false);
        // };
            
        // fetchPosts();
          

        };
        
        fetchPosts();
      }, []);

      const test = async() =>{
        console.log(result)
      }
     
    
    const options = {
        address: collectionAddress,//"0x3727B6e588c7A97Ae00E6bA710E2B15c85Ae4014",
        chain: "rinkeby",
        token_id : nftAddress
    };
    const NFT = useNFTData(options, handleLoading);

    if (loading || NFT===null || typeof NFT == "undefined") {
        return <h2 className='text-center'>Loading...</h2>;
    }

   
    const getMarketItem = (NFT) => {
        result = fetchMarketItems?.find(
          (e) =>
            e.nftContract === NFT.token_address &&
            e.tokenId === NFT.token_id &&
            e.sold === false &&
            e.confirmed === true
            );
        return result;
      };
    

      const handleBuyClick = async (NFT) =>{
        // await getMarketItem(NFT);
        setNftToBuy(NFT);
        // console.log(nftToBuy)
        if(nftToBuy !== null){
            setLoading(true);
        // console.log(nftToBuy)
        const tokenDetails = getMarketItem(nftToBuy);
        const itemID = await tokenDetails.itemId;
        const tokenPrice = await tokenDetails.price;
        setNftPrice(tokenPrice);
        price = tokenPrice;
        const ops = {
          contractAddress: marketAddress,
          functionName: purchaseItemFunction,
          abi: contractABIJson,
          params: {
            nftContract: nftToBuy.token_address,
            itemId: itemID,
          },
          msgValue: tokenPrice,
        };
    
        await contractProcessor.fetch({
          params: ops,
          onSuccess: () => {
            console.log("success");
            updateSoldMarketItem()
            
          },
          onError: (error) => {
            
            console.log(error)
          },
        });
        }
        else{
            handleBuyClick(NFT)
        }
      }

      async function updateSoldMarketItem() {
        const id = getMarketItem(nftToBuy).objectId;
        const marketList = Moralis.Object.extend("CreatedMarketItemTest");
        const query = new Moralis.Query(marketList);
        await query.get(id).then((obj) => {
          obj.set("sold", true);
          obj.set("owner", walletAddress);
          obj.save();
        });
      }

      
    

    return (
        <div>
            <Header />
            <div className="content-wrap">
                <div className="mpl-box-md">

                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-5'>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <NFTDetailsImage image_link={NFT.metadata.image}/>
                                        
                                    </div>
                                    <div className='col-md-12'>
                                        <div className="card text-mute bg-secondary mb-3 mt-6" >
                                            <div className="card-header">Description</div>
                                            <div className="card-body">
                                                <p className="card-text">{NFT.metadata.description}</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-md-12'>
                                        <div className="card text-mute bg-secondary mb-3 mt-6 accordion"  id="accordionParentOne">
                                            <div className="card-header text-mute pointer collapse-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#collapseDetails" aria-expanded="false" aria-controls="collapseDetails">
                                                Item Details
                                            </div>
                                            <div className="card-body collapse" id='collapseDetails' data-bs-parent="#accordionParentOne">
                                                <table width="100%" style={{fontSize:"13px"}}>
                                                    <tbody>
                                                        <tr>
                                                            <td>Contract Address</td>
                                                            <td align='left'><Link to={ `/collection/${NFT.token_address}`}> {NFT.token_address}</Link> </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Token ID</td>
                                                            <td align='left'>{NFT.token_id}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Token Standard</td>
                                                            <td align='left'>{NFT.contract_type}</td>
                                                        </tr>
                                                    </tbody>
                                                    
                                                </table>
                                            </div>
                                        </div>

                                        <NFTAttributesList attributes={NFT.metadata.attributes}/>

                                    </div>
                                </div>
                                
                            </div>
                            <div className='col-md-7'>
                                <div className='pt-20 mb-6'>
                                <Link to={`/collection/${NFT.token_address}`}><span className='collectionName text-mute'>{NFT.name} </span></Link>
                                    <div className='h3 pt-5 mb-0'>{NFT.metadata.name}</div>
                                    <div className='ownedby text-small'>Owned by- {NFT.owner_of}</div>
                                </div>
                                <div className="card text-mute bg-secondary mb-3 mt-6" >
                                   
                                    <div className="card-body">
                                        {getMarketItem(NFT) &&
                                        <div className='p-5'>
                                            Current Price
                                            {/* <div className='h3 ps-2'> Buy for ${getMarketItem(nftToBuy).price / ("1e" + 18)} BNB</div> */}
                                            <div className='h3 ps-2'> Buy For {p} BNB</div>
                                            <button onClick={()=>{test()}}>dyue</button>
                                            
                                        </div>
                                         }
                                        {getMarketItem(NFT) && 
                                            <div>
                                                <div className='text-center'>
                                                    <button onClick={()=>{handleBuyClick(NFT)}} className='btn btn-primary me-5' >Buy</button>
                                                </div>

                                        </div>
                                        }
                                        
                                        
                                    </div>
                                </div>

                                <div className="card text-mute bg-secondary mb-3 mt-6 accordion"  id="accordionParentTwo">
                                    <div className="card-header text-mute pointer collapse-toggle" data-bs-toggle="collapse" data-bs-target="#itemActivity" aria-expanded="true" aria-controls="itemActivity">
                                            Item Activity
                                    </div>
                                    <div className="card-body collapse show" id='itemActivity' data-bs-parent="#accordionParentTwo">
                                    {getMarketItem(NFT) &&
                                        <table className='table table-border'>
                                            <thead>
                                                <tr>
                                                    <th>Event</th>
                                                    <th>Price</th>
                                                    <th>From</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                {!result.sold?(
                                                    <td>List</td>
                                                    ):(
                                                        <td>Sold</td>
                                                    )}
                                                    
                                                    <td>{p} BNB</td>
                                                    <td>{result.seller}</td>
                                                    <td>{result.createdAt}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        }
                                    </div>
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

export default NFT_Details;