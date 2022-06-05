// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/security/ReentrancyGuard.sol";

contract MarketplaceFinal is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address public owner;
    IERC20 internal Ance;

     
     constructor(address _token) {
        Ance = IERC20(_token);
        owner = msg.sender;

     }
     
     struct MarketItem {
         uint itemId;
         address nftContract;
         uint256 tokenId;
         address seller;
         address owner;
         uint256 price;
         bool sold;
     }
     
     mapping(uint256 => MarketItem) private idToMarketItem;
     
     event MarketItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
     );
     
     event MarketItemSold (
         uint indexed itemId,
         address owner
         );

     
    
    
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
        ) public nonReentrant {
            require(price > 0, "Price must be greater than 0");
            
            _itemIds.increment();
            uint256 itemId = _itemIds.current();
  
            idToMarketItem[itemId] =  MarketItem(
                itemId,
                nftContract,
                tokenId,
                msg.sender,
                address(0),
                price,
                false
            );
            
            IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
                
            emit MarketItemCreated(
                itemId,
                nftContract,
                tokenId,
                msg.sender,
                address(0),
                price,
                false
            );
        }
        
    function createMarketSale(
        address nftContract,
        uint256 itemId
        ) public nonReentrant {
            uint price = idToMarketItem[itemId].price;
            uint tokenId = idToMarketItem[itemId].tokenId;
            bool sold = idToMarketItem[itemId].sold;
            require(sold != true, "This Sale has alredy finished");

            emit MarketItemSold(
                itemId,
                msg.sender
                );
	        require(idToMarketItem[itemId].price <= Ance.balanceOf(msg.sender), "not enough tokens");
            IERC20(Ance).transferFrom(msg.sender,idToMarketItem[itemId].seller,price);
            IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
            idToMarketItem[itemId].owner = msg.sender;
            _itemsSold.increment();
            idToMarketItem[itemId].sold = true;
        }
        
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0)) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // function changeListingPrice(uint256 _listingPrice) public{
    //     listingPrice = _listingPrice;
    // }
  
      
}