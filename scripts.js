let ethereum = null;
let accounts = [];
let account  = null;
let provider = null;

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount    = document.querySelector('#showAccount');
const walletInfo     = document.querySelector('#wallet_info');
const sendEthButton  = document.querySelector('.sendEthButton');
const inputAmount    = document.querySelector('input#amount');
const inputWalletTo  = document.querySelector('input#wallet_to');

import Parcela from './ParcelaContract.js';
import FumiToken from './FumiTokenContract.js';
/*import Dron from './build/contracts/DronContract.json';
import FumiToken from './build/contracts/FumiTokenContract.json';
import Fumigacion from './build/contracts/FumigacionContract.json';*/

const address = {
    Parcela : '0xe64788a775D68D0F9D8ea3cb20C4e671dc441Ada',
    Dron : '0x78c824397dE1c0C66519d498D9A0329d1ac85457',
    FumiToken : '0x57B33D4aEA134e568c147EbfCfB286ae6BbA0a53',
    Fumigacion : '0x35f0A7C227DEB8B0dFef7d27F0f1Bd30787d34ed'
}

// Función que verifica si es Metamask
function isMetamask (){
    
    if (typeof window.ethereum !== 'undefined') {
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
            setWalletInfo();
        });

        sendMethod('FumiToken','decimals');

        console.log('ethers', ethers);

        return true;
    }
    return false;

}

function setWalletInfo(){

    walletInfo.value = JSON.stringify({...ethereum._state, chainId: ethereum.chainId}, null, 2);

}

// Listener de botones
ethereumButton.addEventListener('click', () => {
    getAccount();
});

// Función que obtiene la cuenta:
async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    showAccount.value = account;
    setWalletInfo();
}

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

async function sendMethod(abi = 'FumiToken', metodo = 'decimals', params = null){ 

    console.log("sendMethod() - datos - ", abi, metodo, params);
    console.log("sendMethod() - ABI - ", FumiToken.abi);

    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const signer = await ethersProvider.getSigner(account);
    //value.from, ethers.utils.isAddress(value.from),

    const contrato = new ethers.Contract(address[abi], FumiToken.abi, signer);
    console.log("sendMethod() - contrato: ",contrato);

    const transaccion = await contrato[metodo](params);
    console.log("sendMethod() - transaccion: ",transaccion);

    return transaccion;
}
  

/* EJECUCiÖN */

if(isMetamask())
    await initMetamask();