const chai = require('chai');
const expect = chai.expect;
const solidity = require('ethereum-waffle').solidity;
const ethers = require('hardhat').ethers;

chai.use(solidity);

describe('Fumigacion', function () {
    
    let accounts = [];
    let contractF = null;
    let contractD = null;
    let contractP = null;
    let contractFT = null;

    beforeEach(async function () {

        accounts = await ethers.getSigners();

        const ContractD = await ethers.getContractFactory('DronContract');
        contractD = await ContractD.deploy();
        await contractD.deployed();

        const ContractP = await ethers.getContractFactory('ParcelaContract');
        contractP = await ContractP.deploy();
        await contractP.deployed();

        const ContractFT = await ethers.getContractFactory('FumiTokenContract');
        contractFT = await ContractFT.deploy();
        await contractFT.deployed();

        const ContractF = await ethers.getContractFactory('FumigacionContract');
        contractF = await ContractF.deploy(contractFT.address,contractD.address,contractP.address);
        await contractF.deployed();

    });
      
  it("Fumigacion creado", async () => {
    
    const params = [accounts[0].address,1,2,123,[1]];
    await contractD.CrearDron(...params);

    const params2 = [1,2,3];
    await contractP.CrearParcela(...params2);
    //console.log(dron);
    //expect(dron._ID?.toString()).to.be.equal('1');
  });


});