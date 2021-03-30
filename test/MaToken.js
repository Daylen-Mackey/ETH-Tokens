var MaToken = artifacts.require("./MaToken.sol")

contract("MaToken", function (accounts) {

    it("Initializes the contract with the correct name,symbol, and standard",function(){
        var tokenInstance;
        return MaToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();

        }).then(function(tokenName){
            assert.equal(tokenName, "MaToken", "Has the correct name")
            return tokenInstance.symbol();

        }).then(function(tokenSymbol){

            assert.equal(tokenSymbol,"MAT", "Token has the correct symbol")
            return tokenInstance.standard()
        }).then(function(standard){
            assert.equal(standard, "MAT v1.0")
        })




    })

    it("Allocates initial supply upon deployment", function () {
        var tokenInstance;
        var totalSupplyVar;

        return MaToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function (totalSupply) {
            totalSupplyVar = totalSupply
            assert.equal(totalSupply.toNumber(), 1000000, "sets the total supply to 1 milion")
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function (intialBalance) {

            assert.equal(totalSupplyVar.toNumber(), intialBalance.toNumber(), "It allocates the initial supply to the admin account")
        })
    });

    it("Successfully transfers ownership", function() {
        var tokenInstance;

        return MaToken.deployed().then(function (instance){
            tokenInstance = instance


            return tokenInstance.transfer.call(accounts[1],10000000)
        }).then(assert.fail).catch(function(err){
            assert(err.message.toString().includes("revert"), "Error message must contain revert")
        })



    })


})