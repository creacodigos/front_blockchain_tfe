const chai = require('chai');
const expect = chai.expect;
const solidity = require('ethereum-waffle').solidity;
const ethers = require('hardhat').ethers;

chai.use(solidity);

// https://www.chaijs.com/api/bdd/#method_equal

describe('Dron', function () {
    
    let contract = null;
    let accounts = [];
    let account = null;

    beforeEach(async function () {

        accounts = await ethers.getSigners();
        account = accounts[0].address;
        const Contract = await ethers.getContractFactory('DronContract');
        contract = await Contract.deploy();
        await contract.deployed();

    });
    describe('Crear Correcto', function () { 

      it("1 Pesticida", async () => {
        
        const params = [account,1,2,123,[1]];
        await contract.CrearDron(...params);
        const dron = await contract.ObtenerInfoDron(1);
        //console.log(dron);
        expect(dron._ID?.toString()).to.be.equal('1');
      });

      it("3 Pesticida", async () => {
        
        const params = [account,1,2,123,[1,2,3]];
        await contract.CrearDron(...params);
        const dron = await contract.ObtenerInfoDron(1);
        //console.log(dron);
        expect(dron._ID?.toString()).to.be.equal('1');
      });

    });

    describe('Crear ERROR', function () { 

      it("MIN > 0", async () => {
        
        const params = [account,0,2,123,[1]];
        const creacion = contract.CrearDron(...params);
        await expect(creacion).to.be.revertedWith('EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0');
      });
      it("MAX >= MIN", async () => {
        
        const params = [account,5,2,123,[1]];
        const creacion = contract.CrearDron(...params);
        await expect(creacion).to.be.revertedWith('EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO');
      });

      it("COSTE > 0", async () => {
        
        const params = [account,1,2,0,[1]];
        const creacion = contract.CrearDron(...params);
        await expect(creacion).to.be.revertedWith('EL VALOR DE COSTE DEBE SER MAYOR A 0');
      });

      it("PESTICIDA.length > 0", async () => {
        
        const params = [account,1,2,123,[]];
        const creacion = contract.CrearDron(...params);
        await expect(creacion).to.be.revertedWith('EL DRON DEBE CONTENER AL MENOS UN PESTICIDA');
      });

    });

    describe('Configurar Correcto', function () {
      
      it("Empresa", async () => {
    
        const params = [account,1,2,123,[1,2]];
        await contract.CrearDron(...params);
        await contract.ConfigurarEmpresa(1,'0xdD870fA1b7C4700F2BD7f44238821C26f7392148');
        const dron = await contract.ObtenerInfoDron(1);
        expect(dron._Empresa).to.be.equal('0xdD870fA1b7C4700F2BD7f44238821C26f7392148');
      });
    
      it("Altitud", async () => {
        
        const params = [account,1,2,123,[1,2]];
        await contract.CrearDron(...params);
        await contract.ConfigurarAltitud(1,15,25);
        const dron = await contract.ObtenerInfoDron(1);
        expect(dron._Altitud_MIN).to.be.equal('15');
        expect(dron._Altitud_MAX).to.be.equal('25');
      });

      it("Coste", async () => {
        
        const params = [account,1,2,123,[1,2]];
        await contract.CrearDron(...params);
        await contract.ConfigurarCoste(1,500);
        const dron = await contract.ObtenerInfoDron(1);
        expect(dron._Coste).to.be.equal('500');
      });

      it("Alta pesticida", async () => {
        
        const params = [account,1,2,123,[1,2]];
        await contract.CrearDron(...params);
        await contract.AltaPesticida(1,3);
        const dron = await contract.ObtenerInfoDron(1);
        //console.log(dron._Pesticidas);
        expect(dron._Pesticidas[(dron._Pesticidas.length - 1)]).to.be.equal(3);
        //assert.isTrue(alta.receipt?.status); // status == 1 | status == true
      });

      it("Baja pesticida", async () => {
        
        const params = [account,1,2,123,[1,2]];
        await contract.CrearDron(...params);
        await contract.BajaPesticida(1,2);
        const dron = await contract.ObtenerInfoDron(1);
        // console.log(alta?.receipt);
        expect(dron._Pesticidas[(dron._Pesticidas.length - 1)]).to.be.equal(1);
      });

    });

    describe('Configurar ERROR', function () {
      
      it("Altitud incorrecta MAX<MIN", async () => {
        
        const params = [account,1,2,123,[1,2]];
        await contract.CrearDron(...params);
        const result = contract.ConfigurarAltitud(1,15,5);
        await expect(result).to.be.revertedWith('EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO');
      });

      it("Altitud incorrecta MIN 0", async () => {
        
        const params = [account,1,2,123,[1,2]];
        await contract.CrearDron(...params);
        const result = contract.ConfigurarAltitud(1,0,5);
        await expect(result).to.be.revertedWith('EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0');
      });

      it("Coste igual 0", async () => {
        
        const params = [account,1,2,123,[1,2]];
        await contract.CrearDron(...params);
        const result = contract.ConfigurarCoste(1,0);
        await expect(result).to.be.revertedWith('EL COSTE DEBE SER MAYOR A 0');
      });
      
    });

    describe('Obtener Correcto', function () {

      it("Obtener info Dron", async () => {
        const params = [account,1,2,123,[1,2]];
        await contract.CrearDron(...params);
        const dron = await contract.ObtenerInfoDron(1);
        
        expect(dron._ID).to.be.equal(1);
        expect(dron._Empresa).to.be.equal(account);
        expect(dron._Altitud_MIN).to.be.equal('1');
        expect(dron._Altitud_MAX).to.be.equal('2');
        expect(dron._Pesticidas.toString()).to.be.equal('1,2');
        expect(dron._Coste).to.be.equal('123');
      });

      it("Obtener info Drones", async () => {
        
        const params = [account,1,2,123,[1,2]];
        const params2 = [account,1,20,123,[1,2]];
        await contract.CrearDron(...params);
        await contract.CrearDron(...params2);
        const drones = await contract.ObtenerInfoDrones();
        
        expect(drones[0]._ID).to.be.equal(1);
        expect(drones[0]._Empresa).to.be.equal(account);
        expect(drones[0]._Altitud_MIN).to.be.equal('1');
        expect(drones[0]._Altitud_MAX).to.be.equal('2');
        expect(drones[0]._Pesticidas.toString()).to.be.equal('1,2');
        expect(drones[0]._Coste).to.be.equal('123');

        expect(drones[1]._ID).to.be.equal(2);
        expect(drones[1]._Empresa).to.be.equal(account);
        expect(drones[1]._Altitud_MIN).to.be.equal('1');
        expect(drones[1]._Altitud_MAX).to.be.equal('20');
        expect(drones[1]._Pesticidas.toString()).to.be.equal('1,2');
        expect(drones[1]._Coste).to.be.equal('123');

      });

      it("Altitud", async () => {
        
        const params = [account,10,20,123,[1,2]];
        await contract.CrearDron(...params);
        const result = await contract.ComprobarAltitud(1,2,10);
        //console.log(result); // Directamente result xq es una query no transacción, es biew
        expect(result).to.be.true;

      });

      it("Pesticida", async () => {
        
        const params = [account,10,20,123,[1,2]];
        await contract.CrearDron(...params);
        const result = await contract.ComprobarPesticida(1,2);
        expect(result).to.be.true;

      });
  

    });

    describe('Obtener ERROR', function () {

      it("Dron", async () => {
        
        const params = [account,10,20,123,[1,2]];
        await contract.CrearDron(...params);
        const dron = await contract.ObtenerInfoDron(2);        
        expect(dron._ID).to.be.equal(0);

      });

      it("Drones", async () => {
        
        const result = await contract.ObtenerInfoDrones();
        expect(result?.length).to.be.equal(0);
        
      });

      it("Altitud", async () => {
        
        const params = [account,10,20,123,[1,2]];
        await contract.CrearDron(...params);
        const result = await contract.ComprobarAltitud(1,80,100);
        expect(result).to.be.false;

      });
      
      it("Pesticida", async () => {
        
        const params = [account,10,20,123,[1,2]];
        await contract.CrearDron(...params);
        const result = await contract.ComprobarPesticida(1,3);
        expect(result).to.be.false;

      });

    });


});