const Dron = artifacts.require("DronContract");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');
const {expectRevert} = require('@openzeppelin/test-helpers');

contract("Dron", async accounts => {

  let contract = null;
  const waitTime = 1000;

  beforeEach("deploy contract", async function () {
    this.timeout(waitTime);
      contract = await Dron.new();
  });
  
  it("Dron creado 1 Pesticida", async () => {
    
    const params = [accounts[0],1,2,123,[1]];
    //console.log(params);
    const creacion = await contract.CrearDron(...params);
    const dron = await contract.ObtenerInfoDron(1);
    // console.log(contract);
    //console.log(creacion);
    //console.log(dron);
    assert.equal(dron._ID?.toString(),'1');
  });

  it("Dron creado 3 Pesticidas", async () => {
    
    const params = [accounts[0],1,2,123,[1,2,3]];
    const creacion = await contract.CrearDron(...params);
    const dron = await contract.ObtenerInfoDron(1);
    assert.equal(dron._ID?.toString(),'1');
  });   
  
  it("Dron no creado - MIN > 0", async () => {
    
    const params = [accounts[0],0,2,123,[1]];
    const creacion = await contract.CrearDron(...params);
    assert.isTrue(creacion?.receipt?.reason == 'EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0');
  });

  it("Dron no creado - MAX >= MIN", async () => {
    
    const params = [accounts[0],10,2,123,[1]];
    const creacion = await contract.CrearDron(...params);
    assert.isTrue(creacion?.receipt?.reason == 'EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO');
  });

  it("Dron no creado - COSTE > 0", async () => {
    
    const params = [accounts[0],1,2,0,[1]];
    const creacion = await contract.CrearDron(...params);
    assert.isTrue(creacion?.receipt?.reason == 'EL VALOR DE COSTE DEBE SER MAYOR A 0');
  });

  it("Dron no creado - PESTICIDA.length > 0", async () => {
    
    const params = [accounts[0],1,2,123,[]];
    const creacion = await contract.CrearDron(...params);
    assert.isTrue(creacion?.receipt?.reason == 'EL DRON DEBE CONTENER AL MENOS UN PESTICIDA');
  });

  it("Cambiar empresa", async () => {
    
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await contract.CrearDron(...params);
    const result = await contract.ConfigurarEmpresa(1,'0xdD870fA1b7C4700F2BD7f44238821C26f7392148');
    const dron = await contract.ObtenerInfoDron(1);
    assert.equal(dron._Empresa?.toString(),'0xdD870fA1b7C4700F2BD7f44238821C26f7392148');
  });

  it("Configurar altitud correcta", async () => {
    
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await contract.CrearDron(...params);
    const result = await contract.ConfigurarAltitud(1,15,25);
    const dron = await contract.ObtenerInfoDron(1);
    assert.equal(dron._Altitud_MIN?.toString(),'15');
    assert.equal(dron._Altitud_MAX?.toString(),'25');
  });

  it("Configurar altitud incorrecta MAX<MIN", async () => {
    
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await contract.CrearDron(...params);
    const result = await contract.ConfigurarAltitud(1,15,5);
    assert.isTrue(result?.receipt?.reason == 'EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO');
  });

  it("Configurar altitud incorrecta MIN 0", async () => {
    
    const params = [accounts[0],1,2,123,[1,2]];
    const creacion = await contract.CrearDron(...params);
    const result = await contract.ConfigurarAltitud(1,0,5);
    assert.isTrue(result?.receipt?.reason == 'EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0');
  });

  it("Configurar Coste", async () => {
    
    const params = [accounts[0],1,2,123,[1,2]];
    await contract.CrearDron(...params);
    const result = await contract.ConfigurarCoste(1,500);
    const dron = await contract.ObtenerInfoDron(1);
    assert.equal(dron._Coste?.toString(),'500');
  });

  it("Configuracion incorrecta de coste igual 0", async () => {
    
    const params = [accounts[0],1,2,123,[1,2]];
    await contract.CrearDron(...params);
    const result = await contract.ConfigurarCoste(1,0);
    assert.isTrue(result?.receipt?.reason == 'EL COSTE DEBE SER MAYOR A 0');
  });

  it("BuscarPesticida encontrado", async () => {
    
    const params = [accounts[0],1,2,123,[1,2]];
    await contract.CrearDron(...params);
    assert.ok(await contract.BuscarPesticida(1,1)>-1);
  });

  it("BuscarPesticida no encontrado", async () => {
    
    const params = [accounts[0],1,2,123,[1,2]];
    await contract.CrearDron(...params);
    assert.equal(await contract.BuscarPesticida(1,3),-1);
  });

  it("Alta pesticida", async () => {
    
    const params = [accounts[0],1,2,123,[1,2]];
    await contract.CrearDron(...params);
    const alta = await contract.AltaPesticida(1,3);
    // console.log(alta?.receipt);
    assert.isTrue(alta.receipt?.status); // status == 1 | status == true
  });

  it("Baja pesticida", async () => {
    
    const params = [accounts[0],1,2,123,[1,2]];
    await contract.CrearDron(...params);
    const alta = await contract.AltaPesticida(1,3);
    // console.log(alta?.receipt);
    assert.isTrue(alta.receipt?.status); // status == 1 | status == true
  });

  it("Obtener info Dron", async () => {
    const params = [accounts[0],1,2,123,[1,2]];
    await contract.CrearDron(...params);
    const dron = await contract.ObtenerInfoDron(1);
    //console.log(dron?.toString());
    assert.equal(dron._ID?.toString(),'1');
    assert.equal(dron._Empresa?.toString(),accounts[0]);
    assert.equal(dron._Altitud_MIN?.toString(),'1');
    assert.equal(dron._Altitud_MAX?.toString(),'2');
    assert.equal(dron._Pesticidas?.toString(),'1,2');
  });

  it("Obtener info Drones", async () => {
    
    const params = [accounts[0],1,2,123,[1,2]];
    const params2 = [accounts[0],1,20,123,[1,2]];
    await contract.CrearDron(...params);
    await contract.CrearDron(...params2);
    const drones = await contract.ObtenerInfoDrones();
    //console.log(drones?.toString());
    assert.equal(drones?.toString(),'1,'+accounts[0]+',1,2,123,1,2,2,'+accounts[0]+',1,20,123,1,2');
  });
  it("Comprobar Altitud valida", async () => {
    
    const params = [accounts[0],10,20,123,[1,2]];
    await contract.CrearDron(...params);
    const comprobar = await contract.ComprobarAltitud(1,2,10);
    //console.log(comprobar); // Directamente comprobar xq es una query no transacción, es biew
    assert.isTrue(comprobar);
  });

  it("Comprobar Altitud invalida", async () => {
    
    const params = [accounts[0],10,20,123,[1,2]];
    await contract.CrearDron(...params);
    assert.isFalse(await contract.ComprobarAltitud(1,80,100));
  });

  it("Comprobar Pesticida valido", async () => {
    
    const params = [accounts[0],10,20,123,[1,2]];
    await contract.CrearDron(...params);
    assert.isTrue(await contract.ComprobarPesticida(1,2));
  });
  
  it("Comprobar Pesticida invalido", async () => {
    
    const params = [accounts[0],10,20,123,[1,2]];
    await contract.CrearDron(...params);
    assert.isFalse(await contract.ComprobarPesticida(1,3));
  });
  
});