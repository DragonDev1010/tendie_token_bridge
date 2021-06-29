// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import './IToken.sol';

contract BridgeBase {
    address public admin;
    IToken public token;
    uint public nonce;
    mapping(uint => bool) public processedNonce;

    enum Step {Burn, Mint}
    event Transfer (address from, address to, uint amount, uint date, uint nonce, Step indexed step);

    constructor(address _token) public{
        admin = msg.sender;
        token = IToken(_token);
    }
    function burn(address to, uint amount) external {
        token.burn(msg.sender, amount);
        emit Transfer(msg.sender, to, amount, block.timestamp, nonce, Step.Burn);
        nonce++;
    }

}