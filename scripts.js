let ethereum = null;
let accounts = [];
let account  = null;
let provider = null;

const ethereumButton      = document.querySelector('.enableEthereumButton');
const buttonconectado     = document.querySelector('.buttonconectado');
const showAccount         = document.querySelector('#showAccount');
const showAccount_balance = document.querySelector('#showAccount_balance');
const walletInfo          = document.querySelector('#wallet_info');
const contratcsInfo       = document.querySelector('#contratcs_info');
const buttons             = document.querySelectorAll('button');

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
    Parcela : '0xf277a956E59f97b016Da4A1BD117341b2E46Dc75',
    Dron : '0x46658487660e979A73D65e02C86986a209D59C26',
    FumiToken : '0x16252f30Ca22e0fb8278e3Ba66b55322Cb0DB9A8',
    Fumigacion : '0xA5259289E9480F2f5F955e52B90ca156F2780d79'
}

const _Pesticidas = {
    Pesticida_A: 0,
    Pesticida_B: 1,
    Pesticida_C: 2,
    Pesticida_D: 3,
    Pesticida_E: 4
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
/*
//Sending Ethereum to an address
sendEthButton.addEventListener('click', () => {

    if(!account)
    {
        //window.alert('No hay cuentas');
        getAccount();
    }
    console.log('inputWalletTo.value',inputWalletTo.value);
    console.log('inputAmount.value',inputAmount.value);

    let params = {
                    from: ethereum.selectedAddress,
                    to: inputWalletTo.value,
                    value: '0x00',
                    gasPrice: '0x09184e72a000',
                    gas: '0x2710',
                };
    console.table(params);

    ethereum
        .request({
        method: 'eth_sendTransaction',
        params: [ params ],

        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);
});
*/


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

        setWalletInfo();

        ethereum.on('accountsChanged', function (_accounts) {
            // Time to reload your interface with accounts[0]!
            accounts = _accounts
            account  = accounts[0];
            showAccount.value = account;
            showAccount_balance.value = account;
            setWalletInfo();
        });

        if(account)
        {       }
            //await sendMethod('FumiToken','decimals');
            //await sendMethod('Parcela','CrearParcela', [1,2, 2]);
            //await sendMethod('Parcela','ObtenerInfoParcela', [1]); //(int256 MIN, int256 MAX, _Pesticidas PESTICIDA)
            //await sendMethod('Parcela','ObtenerInfoParcela', 1);
 

        //console.log('ethers', ethers);

        return true;
    }
    return false;

}

function setWalletInfo(){

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

}



// Función que obtiene la cuenta:
async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    showAccount.value = account;
    showAccount_balance.value = account;
    setWalletInfo();
}


async function sendMethod(contrato = 'FumiToken', metodo = 'decimals', params = ''){ 

    console.log("---------");
    console.log("sendMethod() "+contrato+"."+metodo+"(params) - (contrato, metodo, params): ", contrato, metodo, params);

    try {
        //console.log("sendMethod() - ABI - ", abis[contrato].abi);
    
        const ethersProvider = new ethers.providers.Web3Provider(provider);
        const signer = await ethersProvider.getSigner(account);
        //value.from, ethers.utils.isAddress(value.from),
    
        const Contract = new ethers.Contract(addresses[contrato], abis[contrato].abi, signer);
        //console.log("sendMethod() - contrato: ",Contract);
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
        

        console.table(respuesta);
    
        return respuesta;

    } catch (error) {

        console.error("sendMethod() - error: ",error);
        return error;

    }
}
  

/* EJECUCiÖN */

if(isMetamask())
    await initMetamask();