const MaToken = artifacts.require("MaToken");
const MaTokenSale = artifacts.require("MaTokenSale");
var tokenPrice = 1000000000000000
module.exports = function (deployer) {
  deployer.deploy(MaToken,1000000).then(function(){
    return deployer.deploy(MaTokenSale, MaToken.address,tokenPrice);

  });
};
