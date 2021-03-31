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
            return tokenInstance.transfer.call(accounts[1], 250000,{from : accounts[0]})
        }).then(function(success){

            assert.equal(success,true, "Successful transfer returns true")
            return tokenInstance.transfer(accounts[1], 250000,{from : accounts[0]})
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, "Triggers one event")
            assert.equal(receipt.logs[0].event , "Transfer", "Is a transfer event")
            assert.equal(receipt.logs[0].args._from, accounts[0], "Logs where the token is from")
            assert.equal(receipt.logs[0].args._to, accounts[1], "Logs where the token is going")
            assert.equal(receipt.logs[0].args._value, 250000, "Logs the proper transfer amount")
            return tokenInstance.balanceOf(accounts[1])
        }).then(function(balance){
            assert.equal(balance.toNumber(), 250000, "Ensure the transfer went through correctly")
            return tokenInstance.balanceOf(accounts[0])
        }).then(function(balance){
            assert.equal(balance.toNumber(), 750000, "deducts the amount")
        })
    })
})