const chai = require('chai');
const expect = chai.expect;
const solidity = require('ethereum-waffle').solidity;
const ethers = require('hardhat').ethers;

chai.use(solidity);

// https://www.chaijs.com/api/bdd/#method_equal

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
    await contractFT.mint(accounts[0].address,9000);

    const ContractF = await ethers.getContractFactory('FumigacionContract');
    contractF = await ContractF.deploy(contractFT.address,contractD.address,contractP.address);
    await contractF.deployed();

  });
  
  describe('Crear Correcto', function () { 
    it("Solicitud fumigacion creado", async () => {
      
      const params = [accounts[0].address,10,20,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [5,15,3];
      await contractP.CrearParcela(...params2);
      
      const params3 = [1,1];
      await contractF.SolicitarFumigacion(...params3);
      const fumigacion = await contractF.ObtenerInfoFumigacion(1);
      expect(fumigacion._ID?.toString()).to.be.equal('1');
    });

  });

  describe('Crear ERROR', function () { 

    it("Solicitud fumigacion no compatible por pesticida", async () => {
      
      const params = [accounts[0].address,10,200,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [100,115,2];
      await contractP.CrearParcela(...params2);

      const params3 = [1,1];
      await expect(contractF.SolicitarFumigacion(...params3)).to.be.revertedWith('EL DRON NO PUEDE SUMINISTRAR EL PESTICIDA NECESARIO PARA LA PARCELA');
    });

    it("Solicitud fumigacion no compatible por altitud", async () => {
      
      const params = [accounts[0].address,10,20,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [100,115,1];
      await contractP.CrearParcela(...params2);

      const params3 = [1,1];
      await expect(contractF.SolicitarFumigacion(...params3)).to.be.revertedWith('EL DRON NO PUEDE TRABAJAR A LA ALTITUD REQUERIDA');
    });

    it("Comprobar compatibilidad error pesticida", async () => {
      
      const params = [accounts[0].address,10,200,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [100,115,2];
      await contractP.CrearParcela(...params2);

      const params3 = [1,1];
      await expect(contractF.ComprobarCompatibilidad(...params3)).to.be.revertedWith('EL DRON NO PUEDE SUMINISTRAR EL PESTICIDA NECESARIO PARA LA PARCELA');
    });

    it("Comprobar compatibilidad error altitud", async () => {
      
      const params = [accounts[0].address,10,20,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [100,115,1];
      await contractP.CrearParcela(...params2);

      const params3 = [1,1];
      await expect(contractF.ComprobarCompatibilidad(...params3)).to.be.revertedWith('EL DRON NO PUEDE TRABAJAR A LA ALTITUD REQUERIDA');
    });

  });

  describe('Obtener Correcto', function () {

    it("Obtener info Fumigación", async () => {
      const params = [accounts[0].address,10,20,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [5,15,3];
      await contractP.CrearParcela(...params2);
      
      const params3 = [1,1];
      await contractF.SolicitarFumigacion(...params3);
      const fumigacion = await contractF.ObtenerInfoFumigacion(1); 
      
      expect(fumigacion._ID).to.be.equal(1);
      expect(fumigacion._IDParcela).to.be.equal(1);
      expect(fumigacion._IDDron).to.be.equal(1);
      expect(fumigacion._Pagada).to.be.false;
      expect(fumigacion._Finalizada).to.be.false;
    });

    it("Obtener info Fumigaciones", async () => {
      const params = [accounts[0].address,10,20,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [5,15,3];
      await contractP.CrearParcela(...params2);
      
      const params3 = [1,1];
      await contractF.SolicitarFumigacion(...params3);

      const params4 = [accounts[0].address,120,250,300,[2,4]];
      await contractD.CrearDron(...params4);

      const params5 = [50,150,2];
      await contractP.CrearParcela(...params5);
      
      const params6 = [2,2];
      await contractF.SolicitarFumigacion(...params6);

      const fumigaciones = await contractF.ObtenerInfoFumigaciones();
      
      expect(fumigaciones[0]._ID).to.be.equal(1);
      expect(fumigaciones[0]._IDParcela).to.be.equal(1);
      expect(fumigaciones[0]._IDDron).to.be.equal(1);
      expect(fumigaciones[0]._Pagada).to.be.false;
      expect(fumigaciones[0]._Finalizada).to.be.false;

      expect(fumigaciones[1]._ID).to.be.equal(2);
      expect(fumigaciones[1]._IDParcela).to.be.equal(2);
      expect(fumigaciones[1]._IDDron).to.be.equal(2);
      expect(fumigaciones[1]._Pagada).to.be.false;
      expect(fumigaciones[1]._Finalizada).to.be.false;
    });
  });

  describe('Obtener ERROR', function () {
    it("Obtener info Fumigación no existente", async () => {
        
      const params = [accounts[0].address,10,20,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [5,15,3];
      await contractP.CrearParcela(...params2);
      
      const params3 = [1,1];
      await contractF.SolicitarFumigacion(...params3);
      const fumigacion = await contractF.ObtenerInfoFumigacion(2); 

      expect(fumigacion._ID).to.be.equal(0);

    });

    it("Obtener info fumigaciones vacio", async () => {
        
      const result = await contractF.ObtenerInfoFumigaciones();
      expect(result?.length).to.be.equal(0);
      
    });
  });

  describe('Realizar correcto', function () {
    it("Pagar fumigacion", async () => {
      
      const params = [accounts[1].address,10,20,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [5,15,3];
      await contractP.CrearParcela(...params2);
      
      const params3 = [1,1];
      await contractF.SolicitarFumigacion(...params3);

      contractFT.approve(contractF.address,123);
      await expect(() => contractF.PagarFumigacion(1))
      .to.changeTokenBalance(contractFT, accounts[1], 123);

      const fumigacion = await contractF.ObtenerInfoFumigacion(1);
      expect(fumigacion._Pagada).to.be.true;

    });

    it("Realizar fumigacion", async () => {
      
      const params = [accounts[1].address,10,20,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [5,15,3];
      await contractP.CrearParcela(...params2);
      
      const params3 = [1,1];
      await contractF.SolicitarFumigacion(...params3);

      contractFT.approve(contractF.address,123);

      await expect(() => contractF.PagarFumigacion(1))
      .to.changeTokenBalance(contractFT, accounts[1], 123);

      await contractF.RealizarFumigacion(1);

      const fumigacion = await contractF.ObtenerInfoFumigacion(1);
      expect(fumigacion._Finalizada).to.be.true;

    });
  });

  describe('Realizar error', function () {
    it("Realizar fumigacion error no ha sido abonada", async () => {
      
      const params = [accounts[1].address,10,20,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [5,15,3];
      await contractP.CrearParcela(...params2);
      
      const params3 = [1,1];
      await contractF.SolicitarFumigacion(...params3);

      await expect(contractF.RealizarFumigacion(1)).to.be.revertedWith('LA FUMIGACION NO HA SIDO ABONADA');
    });

    it("Realizar fumigacion error ya se ha realizado previamente", async () => {
      
      const params = [accounts[1].address,10,20,123,[1,3]];
      await contractD.CrearDron(...params);

      const params2 = [5,15,3];
      await contractP.CrearParcela(...params2);
      
      const params3 = [1,1];
      await contractF.SolicitarFumigacion(...params3);

      contractFT.approve(contractF.address,123);

      await expect(() => contractF.PagarFumigacion(1))
      .to.changeTokenBalance(contractFT, accounts[1], 123);

      await contractF.RealizarFumigacion(1);

      await expect(contractF.RealizarFumigacion(1)).to.be.revertedWith('LA FUMIGACION YA HA SIDO REALIZADA');

    });
  });

});