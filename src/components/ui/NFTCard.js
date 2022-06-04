import React, { useState , useEffect} from 'react';
import { BigNumber} from 'ethers';
import { Link } from 'react-router-dom';
import {useMoralisDapp} from '../MoralisDappProvider/MoralisDappProvider'
import { useWeb3ExecuteFunction ,useMoralisQuery} from "react-moralis";
import { useMoralis } from "react-moralis";
import { Badge } from 'react-bootstrap';
import { useIPFS } from '../support/Helpers';



const NFTCard = ({nft, collectionName, tokenAddress,tokenId,test}) => {
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
    let walletAddress = user.get('ethAddress')
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

    const getMarketItem = (nft) => {
        const result = fetchMarketItems?.find(
          (e) =>
            e.nftContract === nft.token_address &&
            e.tokenId === nft.token_id &&
            e.sold === false &&
            e.confirmed === true
            );
        return result;
      };
  
      useEffect(() => {

        const fetchPosts = async () => {
          setLoading(true);
          setLoading(false);
          handleBuyClick(nft)
        };
        
        fetchPosts();
      }, []);




    const handleBuyClick = async (nft) =>{
        setNftToBuy(nft);
        // console.log(nftToBuy);
        // console.log(getMarketItem(nftToBuy).price / ("1e" + 18))
        setLoading(true);
        const tokenDetails = getMarketItem(nftToBuy);
        const itemID = tokenDetails.itemId;
        const tokenPrice = tokenDetails.price;
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

 
        let img = useIPFS(nft.metadata.image)


    return (
        <div>
            
            <div className="mpl-product-item nft-card">
                <Link to={ `/collection/${nft.token_address}/nft/${nft.token_id}` } className="mpl-product-image">
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
                            <h6> <Link to={ `/collection/${nft.token_address}/nft/${nft.token_id}` } >{nft.metadata.name || `#${nft.token_id}`} </Link> </h6>
                        </div>
                        <div className='col-md-4 text-right'>
                            {getMarketItem(nft) && 
                            <div>
                              <span>{`Buy for ${getMarketItem(nftToBuy).price / ("1e" + 18)} BNB`}</span>
                            </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default NFTCard;