 Sūrya's Description Report

 Files Description Table


|  File Name  |  SHA-1 Hash  |
|-------------|--------------|
| /Users/trabajo/Documents/apps/front_blockchain_tfe/contracts/Tipos.sol | 91a58f62338c1f92ba78d7b7c3bf391df8b17eaf |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/contracts/Dron.sol | 7583ce0378a248b19a6f14b5fb22a22ee52514fa |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol | 3b4b8f6c3a84a90465b6b651a1adcee6c17a4e75 |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol | 08912ceed1e8064362590cfb80164ca6d256f936 |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol | d9d927f913d1d062ea9931d132a2f49f5e0cc423 |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol | 226b298830bad2eb42a66946efa5447c7b8cbb3f |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol | f2961c701500b017eb65f22ae6a5bc46486b959a |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/utils/Address.sol | 04111ab098c4a26d23676fe0bc5b13eeb840965a |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/utils/Context.sol | 719844505df30bda93516e78eab1ced3bfe9ff4a |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/utils/Strings.sol | 8da07805a3ba0f671b12c496f43ae8c2684df165 |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol | b3cc6713a4ecd5a40a432dd8a7382c609564ee1a |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/utils/Counters.sol | 43c5e6b815dec3714603a1a1fc48cf9decf5721c |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/contracts/Fumigacion.sol | 0fe13af8db2fc66d2aba00b8ea42e1c3309e8614 |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/access/Ownable.sol | d756b3242c79ebd83bcf5905ef187773b0675c8b |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol | bbdfe36feba8fe99c567ef2348d4e3b0686d65b2 |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol | cb4d436f05a2a2957f05f80d28df7f7c318900e7 |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol | 403cd21084144d69089f08a23f8766bb2b71da02 |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol | 87b62db9a86c0b9bbc58b51d0d2ae7a8b7688800 |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/contracts/Parcela.sol | 04550d394cb095c2d96ca8b43655edb646f90a38 |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/contracts/FumiToken.sol | d9395f1b2425a25d16ac6e488339393c4f51e857 |
| /Users/trabajo/Documents/apps/front_blockchain_tfe/contracts/Migrations.sol | 69b8fd36420e55cf1274bec2e70399dddcd700fc |


 Contracts Description Table


|  Contract  |         Type        |       Bases      |                  |                 |
|:----------:|:-------------------:|:----------------:|:----------------:|:---------------:|
|     └      |  **Function Name**  |  **Visibility**  |  **Mutability**  |  **Modifiers**  |
||||||
| **TiposContract** | Implementation |  |||
||||||
| **DronContract** | Implementation | ERC721 |||
| └ | <Constructor> | Public ❗️ | 🛑  | ERC721 |
| └ | CrearDron | Public ❗️ | 🛑  |NO❗️ |
| └ | ConfigurarEmpresa | Public ❗️ | 🛑  | SoloPropietario |
| └ | ConfigurarAltitud | Public ❗️ | 🛑  | SoloEmpresa |
| └ | ConfigurarCoste | Public ❗️ | 🛑  | SoloEmpresa |
| └ | BuscarPesticida | Public ❗️ |   |NO❗️ |
| └ | AltaPesticida | Public ❗️ | 🛑  | SoloEmpresa |
| └ | _QuitarPosicionArray | Internal 🔒 | 🛑  | |
| └ | BajaPesticida | Public ❗️ | 🛑  | SoloEmpresa |
| └ | ObtenerInfoDron | Public ❗️ |   |NO❗️ |
| └ | ObtenerInfoDrones | Public ❗️ |   |NO❗️ |
| └ | ComprobarAltitud | Public ❗️ |   |NO❗️ |
| └ | ComprobarPesticida | Public ❗️ |   |NO❗️ |
||||||
| **ERC721** | Implementation | Context, ERC165, IERC721, IERC721Metadata |||
| └ | <Constructor> | Public ❗️ | 🛑  |NO❗️ |
| └ | supportsInterface | Public ❗️ |   |NO❗️ |
| └ | balanceOf | Public ❗️ |   |NO❗️ |
| └ | ownerOf | Public ❗️ |   |NO❗️ |
| └ | name | Public ❗️ |   |NO❗️ |
| └ | symbol | Public ❗️ |   |NO❗️ |
| └ | tokenURI | Public ❗️ |   |NO❗️ |
| └ | _baseURI | Internal 🔒 |   | |
| └ | approve | Public ❗️ | 🛑  |NO❗️ |
| └ | getApproved | Public ❗️ |   |NO❗️ |
| └ | setApprovalForAll | Public ❗️ | 🛑  |NO❗️ |
| └ | isApprovedForAll | Public ❗️ |   |NO❗️ |
| └ | transferFrom | Public ❗️ | 🛑  |NO❗️ |
| └ | safeTransferFrom | Public ❗️ | 🛑  |NO❗️ |
| └ | safeTransferFrom | Public ❗️ | 🛑  |NO❗️ |
| └ | _safeTransfer | Internal 🔒 | 🛑  | |
| └ | _exists | Internal 🔒 |   | |
| └ | _isApprovedOrOwner | Internal 🔒 |   | |
| └ | _safeMint | Internal 🔒 | 🛑  | |
| └ | _safeMint | Internal 🔒 | 🛑  | |
| └ | _mint | Internal 🔒 | 🛑  | |
| └ | _burn | Internal 🔒 | 🛑  | |
| └ | _transfer | Internal 🔒 | 🛑  | |
| └ | _approve | Internal 🔒 | 🛑  | |
| └ | _setApprovalForAll | Internal 🔒 | 🛑  | |
| └ | _checkOnERC721Received | Private 🔐 | 🛑  | |
| └ | _beforeTokenTransfer | Internal 🔒 | 🛑  | |
| └ | _afterTokenTransfer | Internal 🔒 | 🛑  | |
||||||
| **IERC721** | Interface | IERC165 |||
| └ | balanceOf | External ❗️ |   |NO❗️ |
| └ | ownerOf | External ❗️ |   |NO❗️ |
| └ | safeTransferFrom | External ❗️ | 🛑  |NO❗️ |
| └ | transferFrom | External ❗️ | 🛑  |NO❗️ |
| └ | approve | External ❗️ | 🛑  |NO❗️ |
| └ | getApproved | External ❗️ |   |NO❗️ |
| └ | setApprovalForAll | External ❗️ | 🛑  |NO❗️ |
| └ | isApprovedForAll | External ❗️ |   |NO❗️ |
| └ | safeTransferFrom | External ❗️ | 🛑  |NO❗️ |
||||||
| **IERC165** | Interface |  |||
| └ | supportsInterface | External ❗️ |   |NO❗️ |
||||||
| **IERC721Receiver** | Interface |  |||
| └ | onERC721Received | External ❗️ | 🛑  |NO❗️ |
||||||
| **IERC721Metadata** | Interface | IERC721 |||
| └ | name | External ❗️ |   |NO❗️ |
| └ | symbol | External ❗️ |   |NO❗️ |
| └ | tokenURI | External ❗️ |   |NO❗️ |
||||||
| **Address** | Library |  |||
| └ | isContract | Internal 🔒 |   | |
| └ | sendValue | Internal 🔒 | 🛑  | |
| └ | functionCall | Internal 🔒 | 🛑  | |
| └ | functionCall | Internal 🔒 | 🛑  | |
| └ | functionCallWithValue | Internal 🔒 | 🛑  | |
| └ | functionCallWithValue | Internal 🔒 | 🛑  | |
| └ | functionStaticCall | Internal 🔒 |   | |
| └ | functionStaticCall | Internal 🔒 |   | |
| └ | functionDelegateCall | Internal 🔒 | 🛑  | |
| └ | functionDelegateCall | Internal 🔒 | 🛑  | |
| └ | verifyCallResult | Internal 🔒 |   | |
||||||
| **Context** | Implementation |  |||
| └ | _msgSender | Internal 🔒 |   | |
| └ | _msgData | Internal 🔒 |   | |
||||||
| **Strings** | Library |  |||
| └ | toString | Internal 🔒 |   | |
| └ | toHexString | Internal 🔒 |   | |
| └ | toHexString | Internal 🔒 |   | |
||||||
| **ERC165** | Implementation | IERC165 |||
| └ | supportsInterface | Public ❗️ |   |NO❗️ |
||||||
| **Counters** | Library |  |||
| └ | current | Internal 🔒 |   | |
| └ | increment | Internal 🔒 | 🛑  | |
| └ | decrement | Internal 🔒 | 🛑  | |
| └ | reset | Internal 🔒 | 🛑  | |
||||||
| **FumigacionContract** | Implementation | Ownable |||
| └ | <Constructor> | Public ❗️ | 🛑  |NO❗️ |
| └ | RealizarFumigacion | Public ❗️ | 🛑  | onlyOwner |
| └ | SolicitarFumigacion | Public ❗️ | 🛑  |NO❗️ |
| └ | ComprobarCompatibilidad | Public ❗️ |   |NO❗️ |
| └ | PagarFumigacion | Public ❗️ | 🛑  |NO❗️ |
| └ | ObtenerInfoFumigacion | Public ❗️ |   |NO❗️ |
| └ | ObtenerInfoFumigaciones | Public ❗️ |   |NO❗️ |
||||||
| **Ownable** | Implementation | Context |||
| └ | <Constructor> | Public ❗️ | 🛑  |NO❗️ |
| └ | owner | Public ❗️ |   |NO❗️ |
| └ | renounceOwnership | Public ❗️ | 🛑  | onlyOwner |
| └ | transferOwnership | Public ❗️ | 🛑  | onlyOwner |
| └ | _transferOwnership | Internal 🔒 | 🛑  | |
||||||
| **EnumerableSet** | Library |  |||
| └ | _add | Private 🔐 | 🛑  | |
| └ | _remove | Private 🔐 | 🛑  | |
| └ | _contains | Private 🔐 |   | |
| └ | _length | Private 🔐 |   | |
| └ | _at | Private 🔐 |   | |
| └ | _values | Private 🔐 |   | |
| └ | add | Internal 🔒 | 🛑  | |
| └ | remove | Internal 🔒 | 🛑  | |
| └ | contains | Internal 🔒 |   | |
| └ | length | Internal 🔒 |   | |
| └ | at | Internal 🔒 |   | |
| └ | values | Internal 🔒 |   | |
| └ | add | Internal 🔒 | 🛑  | |
| └ | remove | Internal 🔒 | 🛑  | |
| └ | contains | Internal 🔒 |   | |
| └ | length | Internal 🔒 |   | |
| └ | at | Internal 🔒 |   | |
| └ | values | Internal 🔒 |   | |
| └ | add | Internal 🔒 | 🛑  | |
| └ | remove | Internal 🔒 | 🛑  | |
| └ | contains | Internal 🔒 |   | |
| └ | length | Internal 🔒 |   | |
| └ | at | Internal 🔒 |   | |
| └ | values | Internal 🔒 |   | |
||||||
| **ERC20** | Implementation | Context, IERC20, IERC20Metadata |||
| └ | <Constructor> | Public ❗️ | 🛑  |NO❗️ |
| └ | name | Public ❗️ |   |NO❗️ |
| └ | symbol | Public ❗️ |   |NO❗️ |
| └ | decimals | Public ❗️ |   |NO❗️ |
| └ | totalSupply | Public ❗️ |   |NO❗️ |
| └ | balanceOf | Public ❗️ |   |NO❗️ |
| └ | transfer | Public ❗️ | 🛑  |NO❗️ |
| └ | allowance | Public ❗️ |   |NO❗️ |
| └ | approve | Public ❗️ | 🛑  |NO❗️ |
| └ | transferFrom | Public ❗️ | 🛑  |NO❗️ |
| └ | increaseAllowance | Public ❗️ | 🛑  |NO❗️ |
| └ | decreaseAllowance | Public ❗️ | 🛑  |NO❗️ |
| └ | _transfer | Internal 🔒 | 🛑  | |
| └ | _mint | Internal 🔒 | 🛑  | |
| └ | _burn | Internal 🔒 | 🛑  | |
| └ | _approve | Internal 🔒 | 🛑  | |
| └ | _spendAllowance | Internal 🔒 | 🛑  | |
| └ | _beforeTokenTransfer | Internal 🔒 | 🛑  | |
| └ | _afterTokenTransfer | Internal 🔒 | 🛑  | |
||||||
| **IERC20** | Interface |  |||
| └ | totalSupply | External ❗️ |   |NO❗️ |
| └ | balanceOf | External ❗️ |   |NO❗️ |
| └ | transfer | External ❗️ | 🛑  |NO❗️ |
| └ | allowance | External ❗️ |   |NO❗️ |
| └ | approve | External ❗️ | 🛑  |NO❗️ |
| └ | transferFrom | External ❗️ | 🛑  |NO❗️ |
||||||
| **IERC20Metadata** | Interface | IERC20 |||
| └ | name | External ❗️ |   |NO❗️ |
| └ | symbol | External ❗️ |   |NO❗️ |
| └ | decimals | External ❗️ |   |NO❗️ |
||||||
| **ParcelaContract** | Implementation | ERC721 |||
| └ | <Constructor> | Public ❗️ | 🛑  | ERC721 |
| └ | CrearParcela | Public ❗️ | 🛑  |NO❗️ |
| └ | ConfigurarAltitud | Public ❗️ | 🛑  | SoloPropietario |
| └ | ConfigurarPesticida | Public ❗️ | 🛑  | SoloPropietario |
| └ | ObtenerInfoParcela | Public ❗️ |   |NO❗️ |
| └ | ObtenerInfoParcelas | Public ❗️ |   |NO❗️ |
| └ | ComprobarAltitud | Public ❗️ |   |NO❗️ |
||||||
| **FumiTokenContract** | Implementation | ERC20, Ownable |||
| └ | <Constructor> | Public ❗️ | 🛑  | ERC20 |
| └ | mint | Public ❗️ | 🛑  | onlyOwner |
||||||
| **Migrations** | Implementation |  |||
| └ | setCompleted | Public ❗️ | 🛑  | restricted |


 Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    🛑    | Function can modify state |
|    💵    | Function is payable |
