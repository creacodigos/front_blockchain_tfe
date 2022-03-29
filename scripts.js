let ethereum = null;
let accounts = [];
let account  = null;
let provider = null;

const ethereumButton      = document.querySelector('.enableEthereumButton');
const buttonconectado     = document.querySelector('.buttonconectado');
const buttonErrorRed      = document.querySelector('.buttonErrorRed');
const buttonActualizar      = document.querySelector('.buttonActualizar');

const showAccount         = document.querySelector('#showAccount');
const showAccount_balance = document.querySelector('#showAccount_balance');
const walletInfo          = document.querySelector('#wallet_info');
const contratcsInfo       = document.querySelector('#contratcs_info');
const buttons             = document.querySelectorAll('button');
const forms               = document.querySelectorAll('section#infos > section');

let drones = [];
let parcelas = [];
let fumigaciones = [];
let pesticidas = [];

import ParcelaAbi from './abis/ParcelaContract.js';
import DronAbi from './abis/DronContract.js';
import FumiTokenAbi from './abis/FumiTokenContract.js';
import FumigacionAbi from './abis/FumigacionContract.js';

const abis = {

    Parcela : ParcelaAbi,
    Dron : DronAbi,
    FumiToken : FumiTokenAbi,
    Fumigacion : FumigacionAbi
};

const addresses = {
    Parcela : '0xE60197Cf81c10c56784a1B4f8C868c34eA393915',
    Dron : '0xfd89142e3B439dC8C3E37Dab015459012A883eeF',
    FumiToken : '0xDDC673eFfe1DBE88E7d2F07e57999f17622dfE27',
    Fumigacion : '0x32293Ab765C6440a59172e53F63cc574282eac0B'
}

const Pesticidas = [
    'Pesticida_A',
    'Pesticida_B',
    'Pesticida_C',
    'Pesticida_D',
    'Pesticida_E'
];

let lista = {
    drones: [],
    parcelas: [],
    fumigaciones: [],
    pesticidas: Pesticidas
}

// Listener de botones
buttons.forEach(button => {

    button.addEventListener('click', async (event) => {

        event.preventDefault()

        let method   = button.getAttribute('method') || null;
        let form     = button.getAttribute('form') || null;
        let contract = button.getAttribute('contract') || null;
        let inputs   = document.querySelectorAll('form.'+form+' input, form.'+form+' select');
        let pre      = document.querySelector('pre.'+form);

        if(inputs && form && contract)
        {

            //console.log(inputs);
            if(pre)
                pre.innerHTML = ''

            let params = [];
            let checkbox = [];
            inputs.forEach(input => {

                if(
                    input?.type == 'text' && input?.value != '' || 
                    (input?.type == 'checkbox' && input?.checked) || 
                    (input?.type != 'checkbox' && input?.type != 'text' && input?.value)
                )
                if(input?.type == 'checkbox' && input?.checked)
                    checkbox.push(input.value.length < 12 && parseInt(input.value) != 'NaN' ? parseInt(input.value) : input.value);
                else // if(input?.value && (input.))
                    params.push(input.value.length < 12 && parseInt(input.value) != 'NaN' ? parseInt(input.value) : input.value);

            });

            if(checkbox?.length > 0)
                params.push(checkbox);

            console.log('addEventListener - ', contract, method, params);  
            let respuesta = await sendMethod(contract, method, params);
            if(pre && respuesta)
                pre.innerHTML = JSON.stringify(respuesta, undefined, 2)

        }

    });

})

// Listener de botones
ethereumButton.addEventListener('click', () => {
    getAccount();
});
buttonActualizar.addEventListener('click', () => {
    getSelects();
    setWalletInfo();
});



// Función que verifica si es Metamask
function isMetamask (){
    
    if (typeof window.ethereum !== 'undefined') {

        contratcsInfo.value = JSON.stringify(addresses, null, 2);
        return true;
    }
    return false;
}

// Función que inicia Metamask y escucha el cambio de cuentas:
async function initMetamask(){

    if (typeof window.ethereum !== 'undefined') {

        //window.alert('MetaMask is installed!');

        ethereum = window.ethereum;
        provider = await detectEthereumProvider();

        await setWalletInfo();

        ethereum.on('accountsChanged', async function (_accounts) {
            // Time to reload your interface with accounts[0]!
            accounts = _accounts
            account  = accounts[0];
            showAccount.value = account;
            showAccount_balance.value = account;
            await setWalletInfo();
        });

        ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });
          

        return true;
    }
    return false;

}

async function setWalletInfo(){

    walletInfo.value = JSON.stringify({...ethereum._state, chainId: ethereum.chainId}, null, 2);
    showAccount.value = ethereum?._state?.accounts[0] || null;
    showAccount_balance.value = ethereum?._state?.accounts[0] || null;
    if(ethereum?._state?.accounts[0])
    {
        ethereumButton.style.display = 'none';
        buttonconectado.style.display = 'inline-block';
    }
    else
    {
        ethereumButton.style.display = 'inline-block';
        buttonconectado.style.display = 'none';
    }

    let correctChainId = checkChainId(ethereum.chainId);

    if(correctChainId)
    {
        console.log('setWalletInfo() - GET info Drones, Parcelas y Fumigaciones');
        await getSelects();
    }

}

function checkChainId(chainId)
{
    if(chainId != '0x4')
    {
        console.log('chainId',chainId);
        buttonErrorRed.style.display = 'inline-block';
        return false;
    }
    
    forms?.forEach(form => {
        form.style.display = 'block';
    })
    buttonErrorRed.style.display = 'none';
    
    return true;
}

async function getSelects(){

    drones       = await getDrones();
    parcelas     = await getParcelas();
    fumigaciones = await getFumigaciones();
    pesticidas   = getPesticidas();
} 

// Obtenemos los Drones, parcelas y Fumigaciones de los contratos
async function getDrones(){

    lista.drones = await sendMethod('Dron', 'ObtenerInfoDrones');
    console.log('getDrones()',lista.drones);
    setSelects('drones');
}
async function getParcelas(){

    lista.parcelas = await sendMethod('Parcela', 'ObtenerInfoParcelas');
    console.log('getParcelas()',lista.parcelas);
    setSelects('parcelas');
}
async function getFumigaciones(){
    lista.fumigaciones = await sendMethod('Fumigacion', 'ObtenerInfoFumigaciones');
    console.log('getFumigaciones()',lista.fumigaciones);
    setSelects('fumigaciones');
}
function getPesticidas(){
    lista.pesticidas = Pesticidas;
    console.log('getPesticidas()',lista.pesticidas);
    setSelects('pesticidas');
}

// SETEAMOS EN EL DOM LOS SELECT CON EL LISTADO
function setSelects(tipo){

    let selects = document.querySelectorAll('select.'+tipo);
    if(selects)
    {

        console.log(tipo, lista[tipo]);
        let size = lista[tipo]?.length;
        selects?.forEach(select => {
            for (var i = 0; i < size; i++){
                if(tipo == 'drones')
                    select.options[i] = new Option(lista[tipo][i]?._ID+' - ALT MIN: '+ lista[tipo][i]?._Altitud_MIN+' - ALT MAX: '+ lista[tipo][i]?._Altitud_MAX+' - COSTE: '+ lista[tipo][i]?._Coste+'€'+' - Pesticidas: '+ lista[tipo][i]?._Pesticidas, (i+1)); // text , value
                else if(tipo == 'parcelas')
                    select.options[i] = new Option(lista[tipo][i]?._ID+' - ALT MIN: '+ lista[tipo][i]?._Altitud_MIN+' - ALT MAX: '+ lista[tipo][i]?._Altitud_MAX+' - Pesticida: '+ lista[tipo][i]?._Pesticida, (i+1)); // text , value
                else if(tipo == 'fumigaciones')
                    select.options[i] = new Option(lista[tipo][i]?._ID+' - PARCELA: '+ lista[tipo][i]?._IDParcela+' - DRON: '+ lista[tipo][i]?._IDDron+' - Pagada: '+ lista[tipo][i]?._Pagada+' - Finalizada: '+ lista[tipo][i]?._Finalizada, (i+1)); // text , value
                else
                    select.options[i] = new Option((i)+' - '+lista[tipo][i], (i)); // text , value
            }

        })
    }
    else

        console.log('NO EXISTE ', lista[tipo]);
}

// Función que obtiene la cuenta:
async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    showAccount.value = account;
    showAccount_balance.value = account;
    await setWalletInfo();
}


async function sendMethod(contrato = 'FumiToken', metodo = 'decimals', params = ''){ 

    console.log("---------");
    console.log("sendMethod() "+contrato+"."+metodo+"(params) - (contrato, metodo, params): ", contrato, metodo, params);

    try {
        //console.log("sendMethod() - ABI - ", abis[contrato].abi);

        account = ethereum?._state?.accounts[0] || null;

        if(account == null)
        {
            //window.alert("No tienes cuenta vinculada");
            return false;
        }

        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer         = await ethersProvider.getSigner(account); 
        const Contract       = new ethers.Contract(addresses[contrato], abis[contrato].abi, signer);

        if(metodo == 'PagarFumigacion')
        {
            console.log("addresses['FumiToken']",addresses['FumiToken']);
            console.log("abis['FumiToken'].abi",abis['FumiToken'].abi);
            console.log("account",account);

            let infoFumigacion = await Contract.ObtenerInfoFumigacion(...params);
            console.log("infoFumigacion",infoFumigacion);

            const ContractD = new ethers.Contract(addresses['Dron'], abis['Dron'].abi, signer);
            const dron = await ContractD.ObtenerInfoDron(infoFumigacion._IDDron);
            console.log("dron",dron);

            const ContractP = new ethers.Contract(addresses['Parcela'], abis['Parcela'].abi, signer);
            const parcela = await ContractP.ObtenerInfoParcela(infoFumigacion._IDParcela);
            console.log("parcela",parcela);

            if(parcela?._Owner?.toLowerCase() != account?.toLowerCase())
            {
                window.alert("LAS CUENTAS NO COINCIDEN\nEstás conectado con: "+account+"\nDebes conectarte con: "+parcela?._Owner);
                return false;
            }

            const ContractFT = new ethers.Contract(addresses['FumiToken'], abis['FumiToken'].abi, signer);
            const approve = await ContractFT.approve(addresses['Fumigacion'],dron._Coste);
            console.log('approve', approve);

        }

        let respuesta = await Contract[metodo](...params); //1 ,2 ,4 , 'lo que sea'
        console.log("sendMethod() - Contract."+metodo+"(): ",respuesta);

        if(metodo == 'ObtenerInfoDron')
        {

            let format = {
                _ID: respuesta._ID?.toString(),
                _Empresa: respuesta._Empresa,
                _Altitud_MIN: respuesta._Altitud_MIN?.toString(),
                _Altitud_MAX: respuesta._Altitud_MAX?.toString(),
                _Coste: respuesta._Coste?.toString(),
                _Pesticidas: respuesta?._Pesticidas?.toString()
            }
            respuesta = format;

        }
        else if(metodo == 'ObtenerInfoDrones')
        {
            let format = [];
            respuesta.forEach((dron) => {

                format.push({
                    _ID: dron._ID?.toString(),
                    _Empresa: dron._Empresa,
                    _Altitud_MIN: dron._Altitud_MIN?.toString(),
                    _Altitud_MAX: dron._Altitud_MAX?.toString(),
                    _Coste: dron._Coste?.toString(),
                    _Pesticidas: dron?._Pesticidas?.toString()
                });

            })
            respuesta = format;

        }
        else if(metodo == 'ObtenerInfoParcela')
        {

            let format = {
                _ID: respuesta._ID?.toString(),
                _Altitud_MIN: respuesta._Altitud_MIN?.toString(),
                _Altitud_MAX: respuesta._Altitud_MAX?.toString(),
                _Pesticida: respuesta._Pesticida?.toString(),
                _Owner: respuesta?._Owner
            }
            respuesta = format;

        }
        else if(metodo == 'ObtenerInfoParcelas')
        {
            let format = [];
            respuesta.forEach((parcela) => {

                format.push({
                    _ID: parcela._ID?.toString(),
                    _Altitud_MIN: parcela._Altitud_MIN?.toString(),
                    _Altitud_MAX: parcela._Altitud_MAX?.toString(),
                    _Pesticida: parcela._Pesticida?.toString(),
                    _Owner: parcela?._Owner
                });

            })
            respuesta = format;

        }
        else if(metodo == 'ObtenerInfoFumigacion')
        {

            let format = {
                _ID: respuesta._ID?.toString(),
                _IDParcela: respuesta._IDParcela?.toString(),
                _IDDron: respuesta._IDDron?.toString(),
                _Pagada: respuesta._Pagada?.toString(),
                _Finalizada: respuesta?._Finalizada.toString(),
            }
            respuesta = format;

        }
        else if(metodo == 'ObtenerInfoFumigaciones')
        {

            let format = [];
            respuesta.forEach((fumigacion) => {

                format.push({
                    _ID: fumigacion._ID?.toString(),
                    _IDParcela: fumigacion._IDParcela?.toString(),
                    _IDDron: fumigacion._IDDron?.toString(),
                    _Pagada: fumigacion._Pagada?.toString(),
                    _Finalizada: fumigacion?._Finalizada.toString(),
                });

            })
            respuesta = format;
        }
        else if(metodo == 'BuscarPesticida')
        {
            respuesta = respuesta?._hex == '0x00' ? 'Coincide' : 'NO Coincide';
        }
        else if(metodo == 'balanceOf')
        {
            respuesta = parseInt(respuesta?.toString()) || respuesta;
        }

        console.table(respuesta);
    
        return respuesta;

    } catch (error) {

        if(error?.message)
            console.log('ERROR',error?.message);

        console.error("sendMethod() - error: ",error);
        return error;

    }
}
  

/* EJECUCiÖN */

if(isMetamask())
    await initMetamask();