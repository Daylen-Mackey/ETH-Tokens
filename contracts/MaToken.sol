pragma solidity >=0.4.22 <0.9.0;
// pragma solidity >=0.5.0 <0.6.0;

contract MaToken{

    //Constructor --> Run anytime contract is deployed
    // Set the total number of tokens
    // Set the Name
    string public name = "MaToken";
    string public symbol = "MAT";
    string public standard = "MAT v1.0";
    // Set the Symbol
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    constructor(uint256 _initialSupply) public{
        //msg is a global var in solidity --> sender is the address of the account that calls this function
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        //Allocate the initial supply 
    }
// Transfer function
    function transfer(address _to, uint256 _value) public returns (bool success) {
        // Exception if you don't have enough 
        // Returns boolean 
        require(balanceOf[msg.sender] >= _value); //If True, continue running, if false, throw error 
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}