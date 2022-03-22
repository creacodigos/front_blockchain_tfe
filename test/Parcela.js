const Parcela = artifacts.require("ParcelaContract");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');
const {expectRevert} = require('@openzeppelin/test-helpers');

contract("Parcela", async accounts => {

  let contract = null;
  const waitTime = 1000;

  beforeEach("deploy contract", async function () {
    this.timeout(waitTime);
      contract = await Parcela.new();
  });

  it("Parcela creado 1 Pesticida", async () => {
    
    const params = [1,2,1];
    await contract.CrearParcela(...params);
    const parcela = await contract.ObtenerInfoParcela(1);
    assert.equal(parcela._ID?.toString(),'1');
  });

  it("Obtener Parcela", async () => {
    
    const params = [1,2,1];
    await contract.CrearParcela(...params);
    const parcela = await contract.ObtenerInfoParcela(1);
    assert.equal(parcela._ID?.toString(),'1');
    assert.equal(parcela._Altitud_MIN?.toString(),'1');
    assert.equal(parcela._Altitud_MAX?.toString(),'2');
    assert.equal(parcela._Pesticida?.toString(),'1');
    assert.equal(parcela._Owner?.toString(),accounts[0]);
  });
  
  it("Parcela no creado - MIN = 0", async () => {
    
    const params = [0,2,1];
    const creacion = await contract.CrearParcela(...params);
    assert.isTrue(creacion?.receipt?.reason == 'EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0');
    /*
    await expectRevert(
      contract.CrearParcela(...params), 
      "EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0"
    );
    */
    /*await truffleAssert.reverts(
      contract.CrearParcela(...params),
      "EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0"
  );*/
  
  });

  it("Parcela no creado - MAX >= MIN", async () => {
    
    const params = [10,2,1];
    const creacion = await contract.CrearParcela(...params);
    assert.isTrue(creacion?.receipt?.reason == 'EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO');
  });

// EDITA

  it("Configurar altitud correcta", async () => {
    
    const params = [1,2,3];
    await contract.CrearParcela(...params);
    await contract.ConfigurarAltitud(1,15,25);
    const parcela = await contract.ObtenerInfoParcela(1);
    assert.equal(parcela._Altitud_MIN?.toString(),'15');
    assert.equal(parcela._Altitud_MAX?.toString(),'25');
  });

  it("Configurar altitud incorrecta MAX<MIN", async () => {
    
    const params = [1,2,3];
    await contract.CrearParcela(...params);
    const result = await contract.ConfigurarAltitud(1,15,5);
    assert.isTrue(result?.receipt?.reason == 'EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO');
  });

  it("Configurar altitud incorrecta MIN 0", async () => {
    
    const params = [1,2,3];
    await contract.CrearParcela(...params);
    const result = await contract.ConfigurarAltitud(1,0,5);
    assert.isTrue(result?.receipt?.reason == 'EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0');
  });

  it("Configurar Pesticida correcta", async () => {
    
    const params = [1,2,3];
    await contract.CrearParcela(...params);
    await contract.ConfigurarPesticida(1,4);
    const parcela = await contract.ObtenerInfoParcela(1);
    assert.equal(parcela._Pesticida?.toString(),'4');
  });

  it("Configurar Pesticida incorrecta", async () => {
    
    const params = [1,2,3];
    await contract.CrearParcela(...params);
    await contract.ConfigurarPesticida(1,4);
    const parcela = await contract.ObtenerInfoParcela(1);
    assert.notEqual(parcela._Pesticida?.toString(),'3');
  });

});