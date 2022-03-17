const Dron = artifacts.require("DronContract");

module.exports = function (deployer) {
  deployer.deploy(Dron);
};
