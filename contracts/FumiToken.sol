//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

//Importamos
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FumiTokenContract is ERC20, Ownable {

    constructor() ERC20("FumiToken", "FMTKN") {
    }
    
    function mint(address to, uint256 amount)
        public
        onlyOwner
    {
        _mint(to, amount);
    }

}