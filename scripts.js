
let ethereum = null;
let accounts = [];
let account = null;

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('#showAccount');
const walletInfo = document.querySelector('#wallet_info');
const sendEthButton = document.querySelector('.sendEthButton');
const inputAmount = document.querySelector('input#amount');
const inputWalletTo = document.querySelector('input#wallet_to');


// Función que verifica si es Metamask
function isMetamask (){
    
    if (typeof window.ethereum !== 'undefined') {
        return true;
    }
    return false;
}

// Función que inicia Metamask y escucha el cambio de cuentas:
function initMetamask(){

    if (typeof window.ethereum !== 'undefined') {

        //window.alert('MetaMask is installed!');

        ethereum = window.ethereum;
        setWalletInfo();

        ethereum.on('accountsChanged', function (_accounts) {
            // Time to reload your interface with accounts[0]!
            accounts = _accounts
            account = accounts[0];
            showAccount.value = account;
            setWalletInfo();
        });

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
  

/* EJECUCiÖN */

if(isMetamask())
    initMetamask();