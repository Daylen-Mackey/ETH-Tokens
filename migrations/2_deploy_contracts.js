const MaToken = artifacts.require("MaToken");

module.exports = function (deployer) {
  deployer.deploy(MaToken,1000000);
};
