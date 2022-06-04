import React, { useState } from 'react';

function encode(data) {
    return Object.keys(data).map( (key) => {
        if (typeof data[key] === "object") {
            return encodeURIComponent(key) + "=" + encodeURIComponent(JSON.stringify(data[key]));
            // return data[key].map((key1)=>{
            //     // console.log(key1);
            //     return encodeURIComponent(`${key}[]`) + "=" + encodeURIComponent(JSON.stringify(key1))
            // }
            // ).join("&");
        }else{
            return encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        }
    }
    ).join("&");
  }

async function sendSyncRequest(userData, NFTItems) {
    // console.log(userData);

    // encode({ UserID:userData.UserID, SessionID:userData.SessionID, NFTItems })
    return fetch('http://localhost/projects/annihilation_api/syncNFT.php', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encode({ UserID:userData.UserID, SessionID:userData.SessionID, NFTItems }),
    }).then(data => data.json())
    .catch((error) => alert(error));
}

const GameSyncNFT = ({nftList, handleLoading, handleMessage, handleGameLoginState}) => {
    const UserData = JSON.parse(localStorage.getItem("UserData"));
    
    const newNftList = nftList.map((nft) => {
        return {token_id:nft.token_id, token_hash: nft.token_hash, dna: nft.metadata.dna};
    });

    

    const handleSync = async () => {
        handleLoading(true);
        const syncResponse = await sendSyncRequest(UserData, newNftList);
        if(syncResponse.status==200){
            handleMessage(syncResponse.message);
            handleLoading(false);

            // setErrorMessage(null);
            // localStorage.setItem('UserData', JSON.stringify(loginResponse.data));
            // setShowModal(false);
        }else{
            // setErrorMessage(loginResponse.error);
            handleMessage(null);
            handleLoading(false);
            alert(syncResponse.error);
            localStorage.removeItem("UserData");
            handleGameLoginState(false);
        }
        // console.log(syncResponse);
        //setToken(token);
      }



    return (
        <div>
            <button className='btn btn-default' onClick={handleSync}>Sync NFT With Game Now</button>
        </div>
    );
};

export default GameSyncNFT;