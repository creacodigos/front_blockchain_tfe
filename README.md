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

Iniciamos truflle (si es la primera ejecución tras su instalación):

`yarn truffle init`

Ejecutamos una prueba de la red en local:

`yarn truffle develop (prueba local)`

Probar con el nodo local requiere instalar `ganache-cli` con:

`yarn add ganache-cli`

Agrego balance a la cuenta definida:

`yarn ganache-cli --account="<PRIVATE_KEY>,<BALANCE>"`

Lanzamos el migrate en la red local (requiere `yarn truffle develop`):

`yarn truffle migrate`

Ejecutamos la compilación el despliegue de contratos en local (simula lo que haría en real): 

`yarn truffle migrate (Compila y despliega contratos)`

Creamos cuenta en infura y cambiamos la configuración de `truffle-config.js`
Para usar el provider con private key de lacuenta de ethereum asociada para el cas de Ethers

`yarn add truffle-privatekey-provider`

Ejecutamos la compilación en rinkeby:

`yarn truffle migrate --network rinkeby` (Compila y despliegua contratos en rinkeby)

Ejecutar Test completos (require tener levantado el nodo el `yarn truffle develop`):

`yarn truffle test`

Ejecutar Test específico:

`yarn truffle test ./test/Dron.js`

Ejecutar cobertura de tests:

`yarn truffle run coverage`

Solidity Visual Developer para auditar visualmente los contratos desde el editor:

`https://marketplace.visualstudio.com/items?itemName=tintinweb.solidity-visual-auditor`

## HardHat

Entorno HardHat, para test y despliegues más estable que Truffle

`yarn add hardhat`

Instalar módulos:

`yarn add @nomiclabs/hardhat-waffle @nomiclabs/hardhat-ethers solidity-coverage ethereum-waffle`

Compilar con HardHat:

`yarn hardhat compile` 

Lanzar test:

`yarn  hardhat test ./testHardhat/Dron.js`


------
# HERRAMIENTAS UTILIZADAS

## Contratos y utilidades de

- openZeppelin
- ethers (front)
- metamask (front)
- node.js
- Remix
## TESTs

- Remix (e2e)
- Truffle (unitarios)
- Hardhat (unitarios)
- Metamask (Control de redes y wallets correctas y conectadas)
- Truffle Coverage tenía un comportamiento anómalo.
- HardHat Coverage

## Linter para verificar código y por seguridad:

- Solium
- Solhint
- Remix

## Extensiones con ayudas, lintern y verificación de código estático:

- Solidity
- Solidity Visual Developer

## Gráficos y Diagramas con la extensión:

Solidity Visual Developer:
- Surya
- UML
- PlantUML
- Inheritance. Genera un gráfico en formato DOT con el árbol de herencia.
- Parse. Genera un árbol con los objetos AST.)
- `PENDIENTE` mythril > https://github.com/ConsenSys/mythril

## Documentación

Grupo de tres personas: debe incluir :

- Diagrama de despliegue (Raro como ejemplo del trabajo de Juan Luis)
- Diagrama de casos de uso (Tipo sencillo describiendo como se usa la plataforma y por donde pasan la info, transacciones, etc..)
```
sequenceDiagram
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
```
- Diagrama de clases (gigantesco llamado GRAPH)
- Diagrama de secuencia (Ejemplo del trabajo presentado con Juan Luis (artifacts)

# PENDIENTE
- Análisis de seguridad de la solución desarrollada.