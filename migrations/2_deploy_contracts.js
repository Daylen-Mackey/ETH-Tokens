const MaToken = artifacts.require("MaToken");

module.exports = function (deployer) {
  deployer.deploy(MaToken);
};
