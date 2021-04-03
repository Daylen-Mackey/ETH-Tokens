pragma solidity >=0.4.22 <0.9.0;

import "./MaToken.sol";
contract MaTokenSale{
    address admin;
    //contract data type
    MaToken public tokenContract;


    constructor(MaToken _tokenContract) public{
        // Assign an admin -- essentially an external account that will have special rights
        // Have the ability to terminate the sale 
        
        admin = msg.sender; //admin is the person that deploys the contract 
        tokenContract = _tokenContract;

        //Assign the token contract 
        //Assign token price 
    }
}