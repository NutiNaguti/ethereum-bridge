pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "contracts/interfaces/IFunCoin.sol";

contract FunCoin is IFunCoin, ERC20 {
    constructor() ERC20("FunCoin", "FNC") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
