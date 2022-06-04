import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import { useMoralis } from "react-moralis";



const WalletConnectModal = ({showModal, setShowModal}) => {
    const { authenticate, isAuthenticated , user, logout} = useMoralis();

    
    async function metamaskConnect() {
        
    }
    async function trustWalletConnect() {
        if(!isAuthenticated){
            await authenticate({
                provider:'walletconnect',
                mobileLinks: [
                    "trust"
                  ]
            })
            .then(function(user){
                console.log(user.get('ethAddress'));
            })
            .catch(function(error){
                console.log(error);
            });
        }
    }

    return (
        <>
        <Modal show={showModal} onHide={()=>setShowModal(false)} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Connected Wallet</Modal.Title>


            
            </Modal.Header>
            
            <Modal.Body>
            <div className='row'>
                <div className='col-md-4'>
                    {!user?(
                        <button onClick={authenticate} className='btn btn-sm'>Metamask</button>
                    ):(
                        <div>
                            <span>{user.get('ethAddress')}</span>
                            <button onClick={logout}>logout</button>
                        </div>
                    )}
                </div>
                <div className='col-md-4'>
                {!user?(
                    <button className='btn btn-sm btn-primary' onClick={trustWalletConnect}>Trust Wallet</button>
                    ):(
                        <div>
                            <span>{user.get('ethAddress')}</span>
                            <button onClick={logout}>logout</button>
                        </div>
                    )}
                </div>
                
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={ ()=>setShowModal(false) }>
                Close
            </Button>
            </Modal.Footer>
        </Modal> 
        </>
    );
};

export default WalletConnectModal;