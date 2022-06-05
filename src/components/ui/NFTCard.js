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
    let result = [];
    const approvalAmount = 500 * ("1e" + 18)
    const ANCEAddress = '0xBdae05670060ba18e719C4577bA79c0cf10C000C';
    let walletAddress = user.get('ethAddress')
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

  const tokenABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState();

    const getMarketItem = (nft) => {
        result = fetchMarketItems?.find(
          (e) =>
            e.nftContract === nft.token_address &&
            e.tokenId === nft.token_id &&
            e.sold === false &&
            e.confirmed === true
            );
        return result;
      };

      function tete(){
        let IEUF = approvalAmount.tokenPrice
        console.log(IEUF)
      }
  
      useEffect(() => {

        const fetchPosts = async () => {
          setLoading(true);
          // setPrice(result.price / ("1e" + 18));
          setLoading(false);
          handleBuyClick(nft)
        };
        
        fetchPosts();
      }, []);




    const handleBuyClick = async (nft) =>{
        setNftToBuy(nft);
        setLoading(true);
        const tokenDetails = getMarketItem(nftToBuy);
        const itemID = tokenDetails.itemId;
        const tokenPrice = tokenDetails.price;
        console.log(tokenPrice)
        const ops = {
          contractAddress: marketAddress,
          functionName: purchaseItemFunction,
          abi: contractABIJson,
          params: {
            nftContract: nftToBuy.token_address,
            itemId: itemID,
          },
        };
    
        await contractProcessor.fetch({
          params: ops,
          // gasLimit: 250000,
          onSuccess: () => {
            console.log("success");
            updateSoldMarketItem()
          },
          onError: (error) => {
            
            console.log(error)
          },
        });
      }



      async function approveToken() {
        const ops = {
          contractAddress: ANCEAddress,
          functionName: "approve",
          abi:tokenABI ,
          params: {
            spender: '0xD937e4C40a0001E50282476a636535fDF772bC5c',
            amount: String(approvalAmount),
            from:walletAddress
          },
        };
        await contractProcessor.fetch({
          params: ops,
          gasLimit: 250000,
          onSuccess: () => {
            console.log("Approval Received");
          },
          onError: (error) => {
          console.log(error)
          },
        });
  }



let ab = 120000000000000000000;
  async function transferToken() {
    const ops = {
      contractAddress: ANCEAddress,
      functionName: "transfer",
      abi:tokenABI ,
      params: {
        recipient: marketAddress,
        amount: String(ab),
        
      },
    };
    await contractProcessor.fetch({
      params: ops,
      gasLimit: 250000,
      onSuccess: () => {
        console.log("Transfered");
      },
      onError: (error) => {
      console.log(error)
      },
    });
}

     

    async function updateSoldMarketItem() {
      const id = getMarketItem(nftToBuy).objectId;
      const marketList = Moralis.Object.extend("CreatedAb");
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
                        {/* <button onClick={()=>{transferToken()}}>trnsf</button> */}

                        <div className='col-md-4 text-right'>
                            {getMarketItem(nft) && 
                            <div>
                              <button onClick={()=>{approveToken()}}>appr</button>
                              <button onClick={()=>{transferToken()}}>trnsf</button>
                              <button onClick={()=>{handleBuyClick(nft)}}>{`Buy for ${getMarketItem(nftToBuy).price / ("1e" + 18)} BNB`}</button>
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