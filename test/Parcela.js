const Parcela = artifacts.require("ParcelaContract");
const assert = require("chai").assert;

contract("Parcela", async accounts => {

  let contract = null;
  const waitTime = 1000;

  before("deploy contract", async function () {
    this.timeout(waitTime);
      contract = await Parcela.new();
  });

  it("Parcela creado 1 Pesticida", async () => {
    const instance = await Parcela.deployed();
    const params = [1,2,1];
    await instance.CrearParcela(...params);
    const parcela = await instance.ObtenerInfoParcela(1);
    assert.equal(parcela._ID?.toString(),'1');
  });

  it("Obtener Parcela", async () => {
    const instance = await Parcela.deployed();
    const params = [1,2,1];
    await instance.CrearParcela(...params);
    const parcela = await instance.ObtenerInfoParcela(1);
    assert.equal(parcela._ID?.toString(),'1');
    assert.equal(parcela._Altitud_MIN?.toString(),'1');
    assert.equal(parcela._Altitud_MAX?.toString(),'2');
    assert.equal(parcela._Pesticida?.toString(),'1');
    assert.equal(parcela._Owner?.toString(),accounts[0]);
  });

  it("Parcela no creado - MIN > 0", async () => {
    const instance = await Parcela.deployed();
    const params = [0,2,1];
    const creacion = await instance.CrearParcela(...params);
    assert.isTrue(creacion?.receipt?.stack.includes('EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0'));
  });

  it("Parcela no creado - MAX >= MIN", async () => {
    const instance = await Parcela.deployed();
    const params = [10,2,1];
    const creacion = await instance.CrearParcela(...params);
    assert.isTrue(creacion?.receipt?.stack.includes('EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO'));
  });

// EDITA

  it("Configurar altitud correcta", async () => {
    const instance = await Parcela.deployed();
    const params = [1,2,3];
    await instance.CrearParcela(...params);
    await instance.ConfigurarAltitud(1,15,25);
    const parcela = await instance.ObtenerInfoParcela(1);
    assert.equal(parcela._Altitud_MIN?.toString(),'15');
    assert.equal(parcela._Altitud_MAX?.toString(),'25');
  });

  it("Configurar altitud incorrecta MAX<MIN", async () => {
    const instance = await Parcela.deployed();
    const params = [1,2,3];
    await instance.CrearParcela(...params);
    const result = await instance.ConfigurarAltitud(1,15,5);
    assert.isTrue(result?.receipt?.stack.includes('EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO'));
  });

  it("Configurar altitud incorrecta MIN 0", async () => {
    const instance = await Parcela.deployed();
    const params = [1,2,3];
    await instance.CrearParcela(...params);
    const result = await instance.ConfigurarAltitud(1,0,5);
    assert.isTrue(result?.receipt?.stack.includes('EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0'));
  });

  it("Configurar Pesticida correcta", async () => {
    const instance = await Parcela.deployed();
    const params = [1,2,3];
    await instance.CrearParcela(...params);
    await instance.ConfigurarPesticida(1,4);
    const parcela = await instance.ObtenerInfoParcela(1);
    assert.equal(parcela._Pesticida?.toString(),'4');
  });

  it("Configurar Pesticida incorrecta", async () => {
    const instance = await Parcela.deployed();
    const params = [1,2,3];
    await instance.CrearParcela(...params);
    await instance.ConfigurarPesticida(1,4);
    const parcela = await instance.ObtenerInfoParcela(1);
    assert.notEqual(parcela._Pesticida?.toString(),'3');
  });

});