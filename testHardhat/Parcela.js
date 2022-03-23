const chai = require('chai');
const expect = chai.expect;
const solidity = require('ethereum-waffle').solidity;
const ethers = require('hardhat').ethers;

chai.use(solidity);

// https://www.chaijs.com/api/bdd/#method_equal

describe('Parcela', function () {
    
    let contract = null;
    let accounts = [];
    let account = null;

    beforeEach(async function () {

        accounts = await ethers.getSigners();
        account = accounts[0].address;
        const Contract = await ethers.getContractFactory('ParcelaContract');
        contract = await Contract.deploy();
        await contract.deployed();

    });
    describe('Crear Correcto', function () { 

      it("Parcela", async () => {
        
        const params = [1,2,1];
        await contract.CrearParcela(...params);
        const parcela = await contract.ObtenerInfoParcela(1);
        expect(parcela._ID?.toString()).to.be.equal('1');
      });
    });

    describe('Crear ERROR', function () { 

      it("MIN > 0", async () => {
        
        const params = [0,2,1];
        const creacion = contract.CrearParcela(...params);
        await expect(creacion).to.be.revertedWith('EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0');
      });
      
      it("MAX >= MIN", async () => {
        
        const params = [10,2,1];
        const creacion = contract.CrearParcela(...params);
        await expect(creacion).to.be.revertedWith('EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO');
      });

    });

    describe('Configurar Correcto', function () {

      it("Altitud", async () => {
        
        const params = [1,2,3];
        await contract.CrearParcela(...params);
        await contract.ConfigurarAltitud(1,15,25);
        const parcela = await contract.ObtenerInfoParcela(1);
        expect(parcela._Altitud_MIN).to.be.equal('15');
        expect(parcela._Altitud_MAX).to.be.equal('25');
      });

      it("Pesticida", async () => {
        
        const params = [1,2,3];
        await contract.CrearParcela(...params);
        await contract.ConfigurarPesticida(1,4);
        const parcela = await contract.ObtenerInfoParcela(1);
        expect(parcela._Pesticida.toString()).to.be.equal('4');
      });

    });

    describe('Configurar ERROR', function () {
      
      it("Altitud incorrecta MAX<MIN", async () => {
        
        const params = [1,2,3];
        await contract.CrearParcela(...params);
        const result = contract.ConfigurarAltitud(1,15,5);
        await expect(result).to.be.revertedWith('EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO');
      });

      it("Altitud incorrecta MIN 0", async () => {
        
        const params = [1,2,3];
        await contract.CrearParcela(...params);
        const result = contract.ConfigurarAltitud(1,0,5);
        await expect(result).to.be.revertedWith('EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0');
      });

    });

    describe('Obtener Correcto', function () {

      it("Obtener info Parcela", async () => {
        const params = [1,2,1];
        await contract.CrearParcela(...params);
        const parcela = await contract.ObtenerInfoParcela(1);
        
        expect(parcela._ID).to.be.equal(1);
        expect(parcela._Altitud_MIN).to.be.equal('1');
        expect(parcela._Altitud_MAX).to.be.equal('2');
        expect(parcela._Pesticida).to.be.equal(1);
        expect(parcela._Owner.toString()).to.be.equal(accounts[0].address);
      });

      it("Obtener info Parcelas", async () => {
        
        const params = [1,2,1];
        const params2 = [5,10,2];
        await contract.CrearParcela(...params);
        await contract.CrearParcela(...params2);
        const parcelas = await contract.ObtenerInfoParcelas();

        expect(parcelas[0]._ID).to.be.equal(1);
        expect(parcelas[0]._Altitud_MIN).to.be.equal('1');
        expect(parcelas[0]._Altitud_MAX).to.be.equal('2');
        expect(parcelas[0]._Pesticida).to.be.equal(1);
        expect(parcelas[0]._Owner.toString()).to.be.equal(accounts[0].address);
        
        expect(parcelas[1]._ID).to.be.equal(2);
        expect(parcelas[1]._Altitud_MIN).to.be.equal('5');
        expect(parcelas[1]._Altitud_MAX).to.be.equal('10');
        expect(parcelas[1]._Pesticida).to.be.equal(2);
        expect(parcelas[1]._Owner.toString()).to.be.equal(accounts[0].address);

      });

      it("Altitud", async () => {
        
        const params = [1,2,1];
        await contract.CrearParcela(...params);
        const result = await contract.ComprobarAltitud(1,2,10);
        //console.log(result); // Directamente result xq es una query no transacción, es view
        expect(result).to.be.true;

      }); 
      
      it("Altitud MAX>=P.MAX Y MIN<=P.MIN", async () => {
        
        const params = [10,20,1];
        await contract.CrearParcela(...params);
        const result = await contract.ComprobarAltitud(1,1,100);
        //console.log(result); // Directamente result xq es una query no transacción, es view
        expect(result).to.be.true;

      });

      it("Altitud MAX<=P.MAX Y MIN>=P.MIN", async () => {
        
        const params = [10,20,1];
        await contract.CrearParcela(...params);
        const result = await contract.ComprobarAltitud(1,15,18);
        //console.log(result); // Directamente result xq es una query no transacción, es view
        expect(result).to.be.true;

      }); 

    });

    describe('Obtener ERROR', function () {

      it("Parcela", async () => {
        
        const params = [1,2,1];
        await contract.CrearParcela(...params);
        const parcela = await contract.ObtenerInfoParcela(2);        
        expect(parcela._ID).to.be.equal(0);

      });

      it("Parcelas", async () => {
        
        const result = await contract.ObtenerInfoParcelas();
        expect(result?.length).to.be.equal(0);
        
      });

      it("Altitud", async () => {
        
        const params = [10,20,1];
        await contract.CrearParcela(...params);
        const result = await contract.ComprobarAltitud(1,80,100);
        expect(result).to.be.false;

      });

    });

});