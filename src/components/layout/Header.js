import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import WalletConnectModal from "../ui/WalletConnectModal";
import { ConnectButton } from 'web3uikit';


const NAV__LINKS = [
    {
      display: "Home",
      url: "/home",
    },
    {
      display: "Market",
      url: "/market",
    },
    {
      display: "Contact",
      url: "/contact",
    },
  ];

const Header = () => {
    

    return (
        <div>
            <Navbar key="lg" bg="light" expand="lg" className="mb-3 navbar-dark" style={{ borderBottom: '1px solid #333' }} fixed="top" >
                <Container>
                    <Navbar.Brand href="#">
                        NFT Marketplace
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
                    <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" aria-labelledby="offcanvasNavbarLabel-expand-lg" placement="end" >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                        Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <form className="d-flex">
                                <input type="text" style={{ background: '#ffffff29' }} size="40" placeholder="Search here..." className="form-control" aria-label="Search" />
                            </form>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/marketplace" className="nav-link">Marketplace</Link>
                            <Link to="/account" className="nav-link">Account</Link>

                            <ConnectButton signingMessage="Welcome To Annihilation" />
                        </Nav>
                        
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </div>
    );
};

export default Header;