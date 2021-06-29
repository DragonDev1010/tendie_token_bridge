// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import '@pancakeswap/pancake-swap-lib/contracts/token/BEP20/BEP20.sol';

contract TokenBase is BEP20{
    address public admin;
    constructor(string memory name, string memory symbol) BEP20(name, symbol) public{
        admin = msg.sender;
    }
    function updateAdmin(address newAdmin) external {
        require(msg.sender == admin, "only admin can update admin role");
        admin = newAdmin;
    }

    function mint(address to, uint amount) external {
        require(msg.sender == admin, "only admin can mint");
        _mint(to, amount);
    }

    function burn(address owner, uint amount) external {
        require(msg.sender == admin, "only admin can burn");
        _burn(owner, amount);
    }
}