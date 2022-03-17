# front_blockchain_tfe

## Contrato ERC20 
- Token
- Propietario
- MaxSupply

## Contrato ERC20 - (Gestión) Pagos - fumigaciones
- ID
- ID Dron
- ID Parcela
- Fecha fumigación
- Coste
- Pago

## Contrato ERC721 - Dron
- ID
- Propietario
- Altura Máx
- Altura Mín
- Pesticida (Lista)
- Coste

## Contrato ERC721 - Parcela
- ID
- Propietario
- Altura Máx
- Altura Mín
- Pesticida
- Coste

## Front-end (Web3)
- Test: Truffle
- Solidity : ^0.8.0

----------

Documentación:
 - Memoria con:
	- Justificación del de BlockChain
	- Justificación del uso de la tecnología blockchain para resolver el problema
propuesto.
	- Análisis y modelo del sistema propuesto.
	- Descripción del entorno de desarrollo utilizado.
	- Instrucciones de despliegue.
Testing de la solución:
	- Manual de usuario, incluyendo capturas de pantalla a modo de ejemplo de
cada funcionalidad de la solución. Es suficiente con crear una única empresa y
un único propietario.
	- Conclusiones.
El código desarrollado —del back-end, del front-end y de SmartContracts—


## Instalación

Ejecutamos la instalación de paquetes con YARN:

`yarn`

Agregamos truffle al proyecto:

`yarn add truffle`

Agregamos openZeppelin los contratos:

`yarn add @openzeppelin/contracts`


`yarn truffle init`

yarn truffle develop (prueba local)

yarn truffle migrate (Compila y despliega contratos)

Creamos cuenta en infura y cambiamos la configuración de `truffle-config.js`

yarn add truffle-privatekey-provider (para usar el provider con private key de lacuenta de ethereum asociada para el cas de Ethers)

yarn truffle migrate --network rinkeby (Compila y despliegua contratos en rinkeby)
