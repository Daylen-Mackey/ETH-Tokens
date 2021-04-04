pragma solidity >=0.4.22 <0.9.0;

import "./MaToken.sol";
contract MaTokenSale{
    address admin;
    //contract data type
    MaToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(
        address _buyer,
        uint256 _amount
    );

    // event DebugBalance(
    //     uint256 _message
    // );

    // event DebugNumTokens(
    //     uint256 _message
    // );

    constructor(MaToken _tokenContract, uint256 _tokenPrice) public{
        // Assign an admin -- essentially an external account that will have special rights
        // Have the ability to terminate the sale 
        
        admin = msg.sender; //admin is the person that deploys the contract 

        //Assign the token contract 
        //Assign token price 
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;

        
    }
    // Safe multiplication from 
    //https://github.com/dapphub/ds-math/blob/master/src/math.sol
    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    //Buy tokens
    function buyTokens(uint256 _numberOfTokens) public payable {


        // Require that value spent is equal to the tokens
        require(msg.value == multiply(_numberOfTokens, tokenPrice));

        //Require there are enough tokens 
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);        

        // Require that a transfer is successful 
        require(tokenContract.transfer(msg.sender,_numberOfTokens));


        //Keep track of the number of tokens sold 
        tokensSold += _numberOfTokens;
        emit Sell(msg.sender, _numberOfTokens);
        // emit DebugBalance(tokenContract.balanceOf(address(this)));
        // emit DebugNumTokens(_numberOfTokens);
        //Emit Sell event 

    }

    function endSale() public{
        // Require that only an admin can do this
        require(msg.sender == admin);
        // Transfer remaining tokens in the sale back to the admin 
        require(tokenContract.transfer(admin,tokenContract.balanceOf(address(this))));


    }
}