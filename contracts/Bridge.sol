pragma solidity ^0.8.17;

import "contracts/interfaces/IFunCoin.sol";

contract Bridge {
    IFunCoin private _funCoin;

    event Locked(bytes32 indexed proof);

    constructor(address funCoin) {
        _funCoin = IFunCoin(funCoin);
    }

    function lock(uint256 amount) external returns (bytes32 proof) {
        _funCoin.transferFrom(msg.sender, address(this), amount);
        // Indexed and anonymous args of event decodes differently
        // https://docs.soliditylang.org/en/latest/abi-spec.html#abi-events
        // https://docs.soliditylang.org/en/latest/contracts.html#events
        proof = keccak256(abi.encode(block.number, msg.sender, amount));
        emit Locked(proof);
        return proof;
    }
}
