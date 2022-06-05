import React, { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';


export const useNFTData = (options, handleLoading) => {
    const { Moralis, isInitialized, isInitializing } = useMoralis();
    const [NFT, setNFTdata] = useState(null);

    const fetchNFTMetadata = async (options) => {
        try {
            handleLoading(true);
            
            const NFTdata = await Moralis.Web3API.token.getTokenIdMetadata(options);
            if(NFTdata){
                let convertNFTdata = NFTdata;
                convertNFTdata.metadata = JSON.parse(NFTdata.metadata);
                setNFTdata(convertNFTdata);
                handleLoading(false);
            }
        } catch (error) {
            alert(error);
            handleLoading(false);

        }
        
      };

      useEffect(() => {
        if (isInitialized) {
          fetchNFTMetadata(options);
        }
      
    }, [isInitialized]);
    
// console.log(NFT);
    return NFT;
};