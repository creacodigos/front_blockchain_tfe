const Dron = artifacts.require("DronContract");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');
const {expectRevert} = require('@openzeppelin/test-helpers');

contract("Dron", async accounts => {

  let contract = null;
  const waitTime = 1000;

  before("deploy contract", async function () {
    this.timeout(waitTime);
      contract = await Dron.new();
  });

  it("Dron creado 1 Pesticida", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1]];
    console.log(params);
    const creacion = await instance.CrearDron(...params);
    const dron = await instance.ObtenerInfoDron(1);
    // console.log(instance);
    //console.log(creacion);
    //console.log(dron);
    assert.equal(dron._ID?.toString(),'1');
  });

  it("Dron creado 3 Pesticidas", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],0,2,123,[1,2,3]];
    const creacion = await instance.CrearDron(...params);
    const dron = await instance.ObtenerInfoDron(1);
    assert.equal(dron._ID?.toString(),'1');
  });   

  it("Dron no creado - MIN > 0", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],0,2,123,[1]];
    const creacion = await instance.CrearDron(...params);
    assert.isTrue(creacion?.receipt?.stack?.includes('EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0'));
  });

  it("Dron no creado - MAX >= MIN", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],10,2,123,[1]];
    const creacion = await instance.CrearDron(...params);
    assert.isTrue(creacion?.receipt?.stack?.includes('EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO'));
  });

  it("Dron no creado - COSTE > 0", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,0,[1]];
    const creacion = await instance.CrearDron(...params);
    assert.isTrue(creacion?.receipt?.stack?.includes('EL VALOR DE COSTE DEBE SER MAYOR A 0'));
  });

  it("Dron no creado - PESTICIDA.length > 0", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[]];
    const creacion = await instance.CrearDron(...params);
    assert.isTrue(creacion?.receipt?.stack?.includes('EL DRON DEBE CONTENER AL MENOS UN PESTICIDA'));
  });

  it("Cambiar empresa", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    const result = await instance.ConfigurarEmpresa(1,'0xdD870fA1b7C4700F2BD7f44238821C26f7392148');
    const dron = await instance.ObtenerInfoDron(1);
    assert.equal(dron._Empresa?.toString(),'0xdD870fA1b7C4700F2BD7f44238821C26f7392148');
  });

  it("Configurar altitud correcta", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    const result = await instance.ConfigurarAltitud(1,15,25);
    const dron = await instance.ObtenerInfoDron(1);
    assert.equal(dron._Altitud_MIN?.toString(),'15');
    assert.equal(dron._Altitud_MAX?.toString(),'25');
  });

  it("Configurar altitud incorrecta MAX<MIN", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    const result = await instance.ConfigurarAltitud(1,15,5);
    assert.isTrue(result?.receipt?.stack?.includes('EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO'));
  });

  it("Configurar altitud incorrecta MIN 0", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    const result = await instance.ConfigurarAltitud(1,0,5);
    assert.isTrue(result?.receipt?.stack?.includes('EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0'));
  });

  it("Configurar Coste", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    const result = await instance.ConfigurarCoste(1,500);
    const dron = await instance.ObtenerInfoDron(1);
    assert.equal(dron._Coste?.toString(),'500');
  });

  it("Configuracion incorrecta de coste igual 0", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    const result = await instance.ConfigurarCoste(1,0);
    assert.isTrue(result?.receipt?.stack?.includes('EL COSTE DEBE SER MAYOR A 0'));
  });

  it("BuscarPesticida encontrado", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    assert.ok(await instance.BuscarPesticida(1,1)>-1);
  });

  it("BuscarPesticida no encontrado", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    assert.equal(await instance.BuscarPesticida(1,3),-1);
  });
  /*
  it("Alta pesticida", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    assert.isTrue(await instance.AltaPesticida(1,3)==true);
  });

  it("Baja pesticida", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    assert.isTrue(await instance.BajaPesticida(1,2)==true);
  });
  */


  it("Obtener info Dron", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    const dron = await instance.ObtenerInfoDron(1);
    assert.equal(dron._ID?.toString(),'1');
    assert.equal(dron._Empresa?.toString(),accounts[0]);
    assert.equal(dron._Altitud_MIN?.toString(),'1');
    assert.equal(dron._Altitud_MAX?.toString(),'2');
    assert.equal(dron._Pesticidas?.toString(),'1,2');
  });

  it("Obtener info Dron", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    const params2 = [accounts[0],10,20,500,[1,3]];
    const creacion2 = await instance.CrearDron(...params);
    const drones = await instance.ObtenerInfoDrones();
    assert.equal(drones?.toString(),'1,0x90a74a09965b992DA48CBfddA807E6A77c1694b8,1,2,123,1,2,2,0x90a74a09965b992DA48CBfddA807E6A77c1694b8,1,2,123,1,2');
  });

  it("Comprobar Altitud valida", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],10,20,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    assert.isTrue(await instance.ComprobarAltitud(1,2,10)==true);
  });

  it("Comprobar Altitud invalida", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],10,20,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    assert.isTrue(await instance.ComprobarAltitud(1,80,100)==false);
  });

  it("Comprobar Pesticida valido", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],10,20,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    assert.isFalse(await instance.ComprobarPesticida(1,2)==true);
  });

  it("Comprobar Pesticida invalido", async () => {
    const instance = await Dron.deployed();
    const params = [accounts[0],10,20,123,[1,2]];
    const creacion = await instance.CrearDron(...params);
    assert.isFalse(await instance.ComprobarPesticida(1,3)==false);
  });
});