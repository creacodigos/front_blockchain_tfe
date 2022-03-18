const Parcela = artifacts.require("ParcelaContract");
const Dron = artifacts.require("DronContract");
const Fumitoken = artifacts.require("FumiTokenContract");
const Fumigacion = artifacts.require("FumigacionContract");

module.exports = async function (deployer) {
  
  const iParcela = await Parcela.deployed();
  const iDron = await Dron.deployed();
  const iFumitoken = await Fumitoken.deployed();
  await deployer.deploy(Fumigacion, iFumitoken.address, iDron.address, iParcela.address);

};
