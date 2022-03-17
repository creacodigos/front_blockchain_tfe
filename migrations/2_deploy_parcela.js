const Parcela = artifacts.require("ParcelaContract");

module.exports = function (deployer) {
  deployer.deploy(Parcela);
};
