// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./IFundraiser.sol";
import "./Fundraise.sol";


contract Fundraiser is IFundraiser{

    Fundraise[] fundraises;

    function addFundraising(address _beneficiary) external returns(uint48 id){
        
        id = uint48(fundraises.length);
        
        fundraises.push(
            new Fundraise(
                id,
                msg.sender,
                _beneficiary
            )
        );

        emit FundraiseCreated(id);
    }

    function liquidateFundraising(uint48 _id) external  onlyCreator(_id){
        
        emit FundraiseLiquidated(fundraises[_id].beneficiary());
    }

    function fund(uint48 _id, address _asset, uint amount) external{}

    modifier onlyCreator (uint48 _id) {
        require(fundraises[_id].creator() == msg.sender, "Fundraise can only be liquidated by its creator");
        _;
    }
}
