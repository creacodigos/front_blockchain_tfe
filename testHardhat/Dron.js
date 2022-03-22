

const chai = require('chai');
const expect = chai.expect;
const solidity = require('ethereum-waffle').solidity;
const ethers = require('hardhat').ethers;

chai.use(solidity);

describe('Dron', function () {
    
    let contract = null;
    let accounts = [];

    beforeEach(async function () {

        accounts = await ethers.getSigners();
        const Contract = await ethers.getContractFactory('DronContract');
        contract = await Contract.deploy();
        await contract.deployed();

    });
      
  it("Dron creado 1 Pesticida", async () => {
    
    const params = [accounts[0].address,1,2,123,[1]];
    await contract.CrearDron(...params);
    const dron = await contract.ObtenerInfoDron(1);
    //console.log(dron);
    expect(dron._ID?.toString()).to.be.equal('1');
  });

  it("Dron no creado - MIN > 0", async () => {
    
    const params = [accounts[0].address,0,2,123,[1]];
    const creacion = contract.CrearDron(...params);
    await expect(creacion)
        .to.be.revertedWith('EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0');
  });

  it("Alta pesticida", async () => {
    
    const params = [accounts[0].address,1,2,123,[1,2]];
    await contract.CrearDron(...params);
    await contract.AltaPesticida(1,3);
    const dron = await contract.ObtenerInfoDron(1);
    //console.log(dron._Pesticidas);
    expect(dron._Pesticidas[(dron._Pesticidas.length - 1)]).to.be.equal(3);
    //assert.isTrue(alta.receipt?.status); // status == 1 | status == true
  });

});