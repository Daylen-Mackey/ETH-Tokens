pragma solidity >=0.4.22 <0.9.0;
// pragma solidity >=0.5.0 <0.6.0;

contract MaToken{

    //Constructor --> Run anytime contract is deployed
    // Set the total number of tokens
    //Read the total number of tokens 
    uint256 public totalSupply;

    constructor() public{
        totalSupply = 1000000;

    }
}