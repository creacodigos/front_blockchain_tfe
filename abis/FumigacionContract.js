export default {
  "contractName": "FumigacionContract",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "contract ERC20",
          "name": "FumiToken",
          "type": "address"
        },
        {
          "internalType": "contract DronContract",
          "name": "Dron_",
          "type": "address"
        },
        {
          "internalType": "contract ParcelaContract",
          "name": "Parcela_",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "IDParcela",
          "type": "uint256"
        }
      ],
      "name": "FumigacionRealizada",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "IDSolicitud_Fumigacion",
          "type": "uint256"
        }
      ],
      "name": "RealizarFumigacion",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "IDDron",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "IDParcela",
          "type": "uint256"
        }
      ],
      "name": "SolicitarFumigacion",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "IDSolicitud_Fumigacion",
          "type": "uint256"
        }
      ],
      "name": "PagarFumigacion",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ID",
          "type": "uint256"
        }
      ],
      "name": "ObtenerInfoFumigacion",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "_ID",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_IDParcela",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_IDDron",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "_Pagada",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "_Finalizada",
              "type": "bool"
            }
          ],
          "internalType": "struct FumigacionContract.Solicitud_Fumigacion",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]
}