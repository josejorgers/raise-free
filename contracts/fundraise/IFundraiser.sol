// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/// @title IFundraiser
/// @dev Comprises the behavior of a Fundraiser that is able to create and liquidate fundraisings
interface IFundraiser {
    
    function addFundraising(address _beneficiary) external returns(uint48);
    function liquidateFundraising(uint48 _id) external;
    function fund(uint48 _id, address _asset, uint amount) external;
    
    event FundraiseCreated(uint48);
    event FundraiseLiquidated(address);
}