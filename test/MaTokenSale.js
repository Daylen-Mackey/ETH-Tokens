const MaTokenSale = artifacts.require("MaTokenSale");


contract("MaTokenSale", function (accounts) {
    var tokenSaleInstance;

    it("Initializes the contract with the correct values", function(){
        return MaTokenSale.deployed().then(function(instance){
            tokenSaleInstance = instance
            return tokenSaleInstance.address
        }).then(function(address){
            assert.notEqual(address, 0x0000000000000000000000000000000000000000, "Has a non-zero contract address")
            return tokenSaleInstance.tokenContract()
        }).then(function(address){
            assert.notEqual(address, 0x0000000000000000000000000000000000000000, "Has a token address")

    })
    })

})