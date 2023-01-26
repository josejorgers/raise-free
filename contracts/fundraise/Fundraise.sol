// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

enum FundraiseState {
    
    Opened,
    Closed,
    Liquidated
}

contract Fundraise {

    uint48 public id;
    address public creator;
    address public beneficiary;
    FundraiseState public state;

    address[] public assetAddresses;
    mapping(address => uint) public balances;

    constructor (uint48 _id, address _creator, address _beneficiary){
        id = _id;
        creator = _creator;
        beneficiary = _beneficiary;
        state = FundraiseState.Opened;
    }
}