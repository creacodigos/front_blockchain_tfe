const Fumitoken = artifacts.require("FumiTokenContract");

module.exports = function (deployer) {
  deployer.deploy(Fumitoken);
};
