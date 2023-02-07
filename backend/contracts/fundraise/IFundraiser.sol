// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/// @title IFundraiser
/// @dev Comprises the behavior of a Fundraiser that is able to create and liquidate fundraisings
interface IFundraiser {
    
    function addFundraising(address _beneficiary) external returns(uint);
    function liquidateFundraising(uint _id) external;
    function fund(uint _id) payable external;
    function fundToken(uint _id, address _asset, uint amount) external;
    
    event FundraiseCreated(uint);
    event FundraiseLiquidated(uint, address);
    event FundraiseFunded(uint, address funder, address token, uint amount);
}