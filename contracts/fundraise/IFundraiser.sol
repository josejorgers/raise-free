// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IFundraiser {
    
    function addFundraising(address _beneficiary) external;
    function liquidateFundraising() external;
    
}