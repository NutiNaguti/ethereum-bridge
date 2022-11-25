pragma solidity ^0.8.17;

import "contracts/interfaces/IFunCoin.sol";

contract Bridge {
    IFunCoin private _funCoin;

    event Locked(
        uint256 indexed blockNumber,
        address indexed account,
        uint256 indexed amount
    );

    event Locked2(uint256 blockNumber, address account, uint256 amount);

    event Locked3(uint256, address, uint256);

    constructor(address funCoin) {
        _funCoin = IFunCoin(funCoin);
    }

    function lock(uint256 amount) external returns (uint256, address, uint256) {
        _funCoin.transferFrom(msg.sender, address(this), amount);
        // Indexed and anonymous args of event decodes differently
        // https://docs.soliditylang.org/en/latest/abi-spec.html#abi-events
        // https://docs.soliditylang.org/en/latest/contracts.html#events
        emit Locked(block.number, msg.sender, amount);
        emit Locked2(block.number, msg.sender, amount);
        emit Locked3(block.number, msg.sender, amount);
        return (block.number, msg.sender, amount);
    }
}
