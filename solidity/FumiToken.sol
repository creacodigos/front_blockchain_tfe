pragma solidity ^0.8.0;

//Importamos
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/ERC20.sol";

contract FumiToken is ERC20, Ownable {

    constructor() ERC20("FumiToken", "FMTKN") {
    }
    
    function mint(address to, uint256 amount)
        public
        onlyOwner
    {
        _mint(to, amount);
    }

}