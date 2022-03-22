const Fumigacion = artifacts.require("FumigacionContract");
const Dron = artifacts.require("DronContract");
const Parcela = artifacts.require("ParcelaContract");
const Fumitoken = artifacts.require("FumiTokenContract");
const assert = require("chai").assert;

contract("Fumigacion", async accounts => {

    let contractF = null;
    let contractD = null;
    let contractP = null;
    let contractT = null;
  const waitTime = 1000;

  beforeEach("deploy contract", async function () {
    this.timeout(waitTime);
    contractD = await Dron.new();
    contractP = await Parcela.new();
    contractT = await Fumitoken.new();
    contractF = await Fumigacion.new(contractT.address,contractD.address,contractP.address);
  });

  it("Fumigacion creado", async () => {

    const paramsD = [accounts[0],1,2,123,[1,2]]
    const dron = await contractD.CrearDron(...paramsD);
    console.log(dron);

    const paramsP = [1,2,1];
    const parcela = await contractP.CrearParcela(...paramsP);
    console.log(parcela);

/*
    await createDron();
    await createParcela();
    */

    // await contractF.SolicitarFumigacion(1,1);
    // const fumigacion = await contractF.ObtenerInfoFumigacion(1);
    // assert.equal(fumigacion._ID?.toString(),'1');
    
  });

});