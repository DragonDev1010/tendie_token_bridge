// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import './BridgeBase.sol';

contract BridgeBsc is BridgeBase{
    constructor(address token) BridgeBase(token) public{}
}