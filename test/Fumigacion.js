const Fumigacion = artifacts.require("FumigacionContract");
const Dron = artifacts.require("DronContract");
const Parcela = artifacts.require("ParcelaContract");
const assert = require("chai").assert;

contract("Fumigacion", async accounts => {

    let contractF = null;
    let contractD = null;
    let contractP = null;
  const waitTime = 3000;

  before("deploy contract", async function () {
    this.timeout(waitTime);
    contractD = await Dron.new();
    contractP = await Parcela.new();
    contractF = await Fumigacion.new();
  });

    async function createDron(){

        const instanceD = await Dron.deployed();
        const paramsD = [accounts[0],1,2,123,[1]]
        await instanceD.CrearDron(...paramsD);
        const dron = await instanceD.ObtenerInfoDron(1);
        return dron;
    }
    async function createParcela(){

        const instanceP = await Parcela.deployed();
        const paramsP = [1,2,1];
        await instanceP.CrearParcela(...paramsP);
        const parcela = await instanceP.ObtenerInfoParcela(1);
        return parcela;
    }

  it("Fumigacion creado", async () => {

    /*const instanceD = await Dron.deployed();
    const paramsD = [accounts[0],1,2,123,[1]]
    await instanceD.CrearDron(...paramsD);

    const instanceP = await Parcela.deployed();
    const paramsP = [1,2,1];
    await instanceP.CrearParcela(...paramsP);*/

    await createDron();
    await createParcela();
    
    const instance = await Fumigacion.deployed();
    await instance.SolicitarFumigacion(1,1);
    const fumigacion = await instance.ObtenerInfoFumigacion(1);
    assert.equal(fumigacion._ID?.toString(),'1');
    
  });

});