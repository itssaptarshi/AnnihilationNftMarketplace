import React, { useState, useEffect } from 'react';
import NFTCard2 from './NFTCard2';
import Pagination from './Pagination';

const NFTList = ({ nftList, loading, showPerPageItem, pagination, collectionName,tokenAddress,tokenId }) => {
    const [currentPage, setCurrentPage] = useState(1);
    if (typeof showPerPageItem=="undefined") {
        showPerPageItem=10;
    }
    const [nftPerPage] = useState(showPerPageItem);
    const indexOfLastNFT = currentPage * nftPerPage;
    const indexOfFirstNFT = indexOfLastNFT - nftPerPage;
    const currentNftList = nftList.slice(indexOfFirstNFT, indexOfLastNFT);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // if (pagination!=false) {
        
        
        

        
    // }
    


    if (loading) {
        return <h2 className='text-center'>Loading...</h2>;
    }

    return (
        <div>
            <div className='row'>
                {currentNftList.map(nft => (
                    <div className='col-md-4' key={nft.item_id}>
                        <NFTCard2 nft={nft} collectionName={collectionName} tokenAddress={tokenAddress} tokenId={tokenId} />
                    </div>
                    
                ))}
            </div>
            { (pagination!==false)?<Pagination nftPerPage={nftPerPage} currentPage={currentPage} totalNFT={nftList.length} paginate={paginate} />:'' }
        </div>
    );
};

export default NFTList;