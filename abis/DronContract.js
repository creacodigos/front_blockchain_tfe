export default {
  "contractName": "DronContract",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "EMPRESA",
          "type": "address"
        },
        {
          "internalType": "int256",
          "name": "MIN",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "MAX",
          "type": "int256"
        },
        {
          "internalType": "uint256",
          "name": "COSTE",
          "type": "uint256"
        },
        {
          "internalType": "enum TiposContract._Pesticidas[]",
          "name": "PESTICIDA",
          "type": "uint8[]"
        }
      ],
      "name": "CrearDron",
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
          "name": "ID",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "EMPRESA",
          "type": "address"
        }
      ],
      "name": "ConfigurarEmpresa",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ID",
          "type": "uint256"
        },
        {
          "internalType": "int256",
          "name": "MIN",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "MAX",
          "type": "int256"
        }
      ],
      "name": "ConfigurarAltitud",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ID",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "COSTE",
          "type": "uint256"
        }
      ],
      "name": "ConfigurarCoste",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ID",
          "type": "uint256"
        },
        {
          "internalType": "enum TiposContract._Pesticidas",
          "name": "PESTICIDA",
          "type": "uint8"
        }
      ],
      "name": "BuscarPesticida",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ID",
          "type": "uint256"
        },
        {
          "internalType": "enum TiposContract._Pesticidas",
          "name": "PESTICIDA",
          "type": "uint8"
        }
      ],
      "name": "AltaPesticida",
      "outputs": [
        {
          "internalType": "bool",
          "name": "result",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ID",
          "type": "uint256"
        },
        {
          "internalType": "enum TiposContract._Pesticidas",
          "name": "PESTICIDA",
          "type": "uint8"
        }
      ],
      "name": "BajaPesticida",
      "outputs": [
        {
          "internalType": "bool",
          "name": "result",
          "type": "bool"
        }
      ],
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
      "name": "ObtenerInfoDron",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "_ID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_Empresa",
              "type": "address"
            },
            {
              "internalType": "int256",
              "name": "_Altitud_MIN",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "_Altitud_MAX",
              "type": "int256"
            },
            {
              "internalType": "uint256",
              "name": "_Coste",
              "type": "uint256"
            },
            {
              "internalType": "enum TiposContract._Pesticidas[]",
              "name": "_Pesticidas",
              "type": "uint8[]"
            }
          ],
          "internalType": "struct DronContract.Dron",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "ObtenerInfoDrones",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "_ID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_Empresa",
              "type": "address"
            },
            {
              "internalType": "int256",
              "name": "_Altitud_MIN",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "_Altitud_MAX",
              "type": "int256"
            },
            {
              "internalType": "uint256",
              "name": "_Coste",
              "type": "uint256"
            },
            {
              "internalType": "enum TiposContract._Pesticidas[]",
              "name": "_Pesticidas",
              "type": "uint8[]"
            }
          ],
          "internalType": "struct DronContract.Dron[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ID",
          "type": "uint256"
        },
        {
          "internalType": "int256",
          "name": "MIN",
          "type": "int256"
        },
        {
          "internalType": "int256",
          "name": "MAX",
          "type": "int256"
        }
      ],
      "name": "ComprobarAltitud",
      "outputs": [
        {
          "internalType": "bool",
          "name": "result",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ID",
          "type": "uint256"
        },
        {
          "internalType": "enum TiposContract._Pesticidas",
          "name": "PESTICIDA",
          "type": "uint8"
        }
      ],
      "name": "ComprobarPesticida",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]
}