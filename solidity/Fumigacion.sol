pragma solidity ^0.8.0; 

//Importamos
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./Dron.sol";
import "./Parcela.sol";

//Extendemos del contrato ERC721 (Contrato destinado a Tokens no fungibles)
contract Fumigacion is Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;
    using Counters for Counters.Counter;
    Counters.Counter UltimoID;

    //Creamos las variables propias del contrato
    struct Solicitud_Fumigacion {
        uint256 _ID;
        uint256 _IDParcela;
        uint256 _IDDron;
        bool _Pagada;
        bool _Finalizada;
    }

    mapping(uint256 => Solicitud_Fumigacion) private _Solicitudes_Fumigacion;

    ERC20 _FumiToken;
    Dron _Dron;
    Parcela _Parcela;

    constructor(ERC20 FumiToken, Dron Dron_, Parcela Parcela_) {
        _FumiToken = FumiToken;
        _Dron = Dron_;
        _Parcela = Parcela_;
    }

    /*
    function _QuitarPosicionArray(uint key) internal {
        require(key < Solicitudes_Fumigacion.length);
        Solicitudes_Fumigacion[key] = Solicitudes_Fumigacion[Solicitudes_Fumigacion.length-1];
        Solicitudes_Fumigacion.pop();
    }
    */

    event FumigacionRealizada(uint256 IDParcela);
    function RealizarFumigacion(uint256 IDSolicitud_Fumigacion) public onlyOwner {
        require (_Solicitudes_Fumigacion[IDSolicitud_Fumigacion]._Pagada, "LA FUMIGACION NO HA SIDO ABONADA");
        require (_Solicitudes_Fumigacion[IDSolicitud_Fumigacion]._Finalizada == false, "LA FUMIGACION YA HA SIDO REALIZADA");
        //Enciar al dron a fumigar
        _Solicitudes_Fumigacion[IDSolicitud_Fumigacion]._Finalizada = true;
        emit FumigacionRealizada(_Solicitudes_Fumigacion[IDSolicitud_Fumigacion]._IDParcela);
    }

    function SolicitarFumigacion(uint256 IDDron, uint256 IDParcela) public returns (uint256){
        UltimoID.increment();
        uint256 IDActual = UltimoID.current();

        Solicitud_Fumigacion memory Fumigacion = Solicitud_Fumigacion({
            _ID: IDActual,
            _IDParcela: IDParcela,
            _IDDron: IDDron,
            _Pagada: false,
            _Finalizada: false
        });

        _Solicitudes_Fumigacion[IDActual] = Fumigacion;

        return IDActual;
    }

    function PagarFumigacion(uint256 IDSolicitud_Fumigacion) public {
        //solicitar info Dron
        Dron.Dron memory Dron_ = _Dron.ObtenerInfoDron(_Solicitudes_Fumigacion[IDSolicitud_Fumigacion]._IDDron);
        //solicitar info Parcela
        Parcela.Parcela memory Parcela_ = _Parcela.ObtenerInfoParcela(_Solicitudes_Fumigacion[IDSolicitud_Fumigacion]._IDParcela);

        require (msg.sender == Parcela_._Owner, "Solo el propietario de la parcela puede pagar");
        
        //realizar transferencia
        if (_FumiToken.transferFrom(Parcela_._Owner, Dron_._Empresa, Dron_._Coste)) {
            _Solicitudes_Fumigacion[IDSolicitud_Fumigacion]._Pagada = true;
        }
    }
}