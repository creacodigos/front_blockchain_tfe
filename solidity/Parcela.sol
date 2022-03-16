pragma solidity ^0.8.0; 

//Importamos
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

//Extendemos del contrato ERC721 (Contrato destinado a Tokens no fungibles)
contract Parcela is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter UltimoID;

    enum _Pesticidas{
        Pesticida_A,
        Pesticida_B,
        Pesticida_C,
        Pesticida_D,
        Pesticida_E
    }

    //Creamos las variables propias del contrato
    struct Parcela {
        uint256 _ID;
        int256 _Altitud_MIN;
        int256 _Altitud_MAX;
        _Pesticidas _Pesticida;
        address _Owner;
    }

    mapping(uint256 => Parcela) private _Parcelas;

    constructor() ERC721("MyParcela", "MParcela") {
        
        UltimoID.increment();
        uint256 IDActual = UltimoID.current();
        /*
        Parcela storage Primera = _Parcelas[IDActual];
  
        Primera._ID = IDActual;
        Primera._Altitud_MIN = 0;
        Primera._Altitud_MAX = 0;
        Primera._Owner = msg.sender;
        */

        _safeMint(msg.sender,IDActual);
    }

    //Modificador de permisos de acceso
    modifier SoloPropietario(uint256 ID){
        require(msg.sender == ownerOf(ID));
        _;
    }

    function CrearParcela(int256 MIN, int256 MAX, _Pesticidas PESTICIDA) public returns (uint256){
        UltimoID.increment();
        uint256 IDActual = UltimoID.current();

        Parcela memory Parcela_ = Parcela({
            _ID: IDActual,
            _Altitud_MIN: MIN,
            _Altitud_MAX: MAX,
            _Pesticida: PESTICIDA,
            _Owner: msg.sender
        });

        _Parcelas[IDActual] = Parcela_;

        return IDActual;
    }

    function ConfigurarAltitud(uint256 ID, int256 MIN, int256 MAX) public SoloPropietario(ID) returns (int256, int256)
    {
        require (MIN > 0, "EL VALOR DE ALTITUD MINIMO DEBE SER MAYOR A 0");
        require (MAX >= MIN, "EL VALOR DE ALTITUD MAXIMO DEBE SER MAYOR O IGUAL AL MINIMO");
        _Parcelas[ID]._Altitud_MIN = MIN;
        _Parcelas[ID]._Altitud_MAX = MAX;
        return ( _Parcelas[ID]._Altitud_MIN,  _Parcelas[ID]._Altitud_MAX);
    }

    function ConfigurarPesticida(uint256 ID, _Pesticidas PESTICIDA) public SoloPropietario(ID) returns (bool)
    {
        _Parcelas[ID]._Pesticida = PESTICIDA;
        return true;
    }

    function ObtenerInfoParcela(uint256 ID) public view returns (Parcela memory) {
        return _Parcelas[ID];
    }

    function ComprobarAltitud(uint256 ID, int256 MIN, int256 MAX) public view returns (bool)
    {
        if ((MAX < _Parcelas[ID]._Altitud_MIN) || (MIN > _Parcelas[ID]._Altitud_MAX) || (MIN > MAX)) {
            return false;
        } else {
            if ((MAX >= _Parcelas[ID]._Altitud_MIN && MAX <= _Parcelas[ID]._Altitud_MAX) || (MIN <= _Parcelas[ID]._Altitud_MAX && MIN >= _Parcelas[ID]._Altitud_MIN)) {
                return true;
            } else {
                if ((MAX >= _Parcelas[ID]._Altitud_MAX && MIN <= _Parcelas[ID]._Altitud_MIN) || (MAX <= _Parcelas[ID]._Altitud_MAX && MIN >= _Parcelas[ID]._Altitud_MIN)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
}