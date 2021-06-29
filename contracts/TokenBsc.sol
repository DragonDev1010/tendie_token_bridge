// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import './TokenBase.sol';

contract TokenBsc is TokenBase{
    constructor() TokenBase('BSC Token', 'BTK') public{}
}