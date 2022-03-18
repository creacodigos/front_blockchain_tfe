//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0; 

//Importamos
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Tipos.sol";

//Extendemos del contrato ERC721 (Contrato destinado a Tokens no fungibles)
contract DronContract is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter UltimoID;

    //Creamos las variables propias del contrato
    struct Dron {
        uint256 _ID;
        address _Empresa; 
        int256 _Altitud_MIN;
        int256 _Altitud_MAX;
        uint256 _Coste;
        TiposContract._Pesticidas[] _Pesticidas;
    }

    mapping(uint256 => Dron) private _Drones;
    Dron[] DRONES;

    constructor() ERC721("MyDron", "MDron") {
    }

    //Modificador de permisos de acceso
    modifier SoloPropietario(uint256 ID){
        require(msg.sender == ownerOf(ID));
        _;
    }

    //Modificador de permisos de acceso
    modifier SoloEmpresa(uint256 ID){
        require(msg.sender == _Drones[ID]._Empresa || msg.sender == ownerOf(ID));
        _;
    }

    function CrearDron(address EMPRESA, int256 MIN, int256 MAX, uint256 COSTE, TiposContract._Pesticidas[] calldata PESTICIDA) public returns (uint256){
        require (MIN > 0, "EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0");
        require (MAX >= MIN, "EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO");
        require (COSTE > 0, "EL VALOR DE COSTE DEBE SER MAYOR A 0");
        require (PESTICIDA.length > 0, "EL DRON DEBE CONTENER AL MENOS UN PESTICIDA");

        UltimoID.increment();
        uint256 IDActual = UltimoID.current();
        _safeMint(msg.sender,IDActual);
        Dron memory Dron_ = Dron({
            _ID: IDActual,
            _Empresa: EMPRESA,
            _Altitud_MIN: MIN,
            _Altitud_MAX: MAX,
            _Coste: COSTE,
            _Pesticidas: PESTICIDA            
        });

        _Drones[IDActual] = Dron_;
        DRONES.push(Dron_);

        return IDActual;
    }

    function ConfigurarEmpresa(uint256 ID, address EMPRESA) public SoloPropietario(ID) returns (bool)
    {
        _Drones[ID]._Empresa = EMPRESA;
        return true;
    }

    function ConfigurarAltitud(uint256 ID, int256 MIN, int256 MAX) public SoloEmpresa(ID) returns (int256, int256)
    {
        require (MIN > 0, "EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0");
        require (MAX >= MIN, "EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO");
        _Drones[ID]._Altitud_MIN = MIN;
        _Drones[ID]._Altitud_MAX = MAX;
        return (_Drones[ID]._Altitud_MIN, _Drones[ID]._Altitud_MAX);
    }

    function ConfigurarCoste(uint256 ID, uint256 COSTE) public SoloEmpresa(ID) returns (bool)
    {
        require (COSTE > 0, "EL COSTE DEBE SER MAYOR A 0");
        _Drones[ID]._Coste = COSTE;
        return true;
    }

    function BuscarPesticida(uint256 ID, TiposContract._Pesticidas PESTICIDA) public view returns (int)
    {
        for (int i = 0; i < int(_Drones[ID]._Pesticidas.length); i++) {
            if (_Drones[ID]._Pesticidas[uint(i)] == PESTICIDA) {
                return i;
            }
        }
        return -1;
    }

    function AltaPesticida(uint256 ID, TiposContract._Pesticidas PESTICIDA) public SoloEmpresa(ID) returns (bool)
    {
        int key = BuscarPesticida(ID, PESTICIDA);
        if (key >= 0) {
            return false;
        } else {
            _Drones[ID]._Pesticidas.push(PESTICIDA);
            return true;
        }
    }

    function _QuitarPosicionArray(uint256 ID, uint key) internal {
        require(key < _Drones[ID]._Pesticidas.length);
        _Drones[ID]._Pesticidas[key] = _Drones[ID]._Pesticidas[_Drones[ID]._Pesticidas.length-1];
        _Drones[ID]._Pesticidas.pop();
    }

    function BajaPesticida(uint256 ID, TiposContract._Pesticidas PESTICIDA) public SoloEmpresa(ID) returns (bool)
    {
        int key = BuscarPesticida(ID, PESTICIDA);
        if (key >= 0) {
            _QuitarPosicionArray(ID, uint(key));
            return true;
        } else {
            return false;
        }
    }

    function ObtenerInfoDron(uint256 ID) public view returns (Dron memory) {
        return _Drones[ID];
    }

    function ObtenerInfoDrones() public view returns (Dron [] memory) {
        return DRONES;
    }

    function ComprobarAltitud(uint256 ID, int256 MIN, int256 MAX) public view returns (bool)
    {
        if ((MAX < _Drones[ID]._Altitud_MIN) || (MIN > _Drones[ID]._Altitud_MAX) || (MIN > MAX)) {
            return false;
        } else {
            if ((MAX >= _Drones[ID]._Altitud_MIN && MAX <= _Drones[ID]._Altitud_MAX) || (MIN <= _Drones[ID]._Altitud_MAX && MIN >= _Drones[ID]._Altitud_MIN)) {
                return true;
            } else {
                if ((MAX >= _Drones[ID]._Altitud_MAX && MIN <= _Drones[ID]._Altitud_MIN) || (MAX <= _Drones[ID]._Altitud_MAX && MIN >= _Drones[ID]._Altitud_MIN)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    function ComprobarPesticida(uint256 ID, TiposContract._Pesticidas PESTICIDA) public view returns (bool)
    {
        int key = BuscarPesticida(ID, PESTICIDA);
        if (key >= 0) {
            return true;
        } else {
            return false;
        }
    }
}