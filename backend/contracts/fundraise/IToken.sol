// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


interface IToken {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}