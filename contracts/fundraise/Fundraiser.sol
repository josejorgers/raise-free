// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./IFundraiser.sol";
import "./IToken.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

enum FundraiseState {
    Opened,
    Closed
}

contract Fundraiser is IFundraiser{

    struct Fundraise {

        uint48  id;
        address creator;
        address beneficiary;
        
        FundraiseState state;

        address[] assetAddresses;
        mapping(address => uint) balances;
    }

    Fundraise[] fundraises;
    
    function totalUniqueAssets(uint48 id) private view returns(uint) {
        return fundraises[id].assetAddresses.length;
    }

    function getAssetAddress(uint48 id, uint48 _i) private view returns(address){
        return fundraises[id].assetAddresses[_i];
    }

    function getAssetBalance(uint48 id, address asset) private view returns(uint){
        return fundraises[id].balances[asset];
    }
    function isAssetInFundraise(uint48 id, address asset) private view returns(bool){

        for(uint48 i = 0; i < fundraises[id].assetAddresses.length; i++)
            if(fundraises[id].assetAddresses[i] == asset)
                return true;
        return false;
    }

    function addNewAsset(uint48 id, address asset) private {
        if(!isAssetInFundraise(id, asset))
            fundraises[id].assetAddresses.push(asset);
    }
    

    function addFundraising(address _beneficiary) external returns(uint48 id){
        
        id = uint48(fundraises.length);
        
        // Workaround to push a struct that has a nested mapping
        Fundraise storage fr = fundraises.push();
        fr.id = id;
        fr.creator = msg.sender;
        fr.beneficiary = _beneficiary;
        fr.state = FundraiseState.Opened;

        emit FundraiseCreated(id);
    }

    function liquidateFundraising(uint48 _id) external  onlyCreator(_id) onlyOpened(_id) {
        
        uint length = totalUniqueAssets(_id);

        for(uint48 i = 0; i < length; i++){

            address payable tokenAddr = payable(getAssetAddress(_id, i));
            require(IERC20(tokenAddr).transfer(fundraises[_id].beneficiary, getAssetBalance(_id, tokenAddr)));

        }
        fundraises[_id].state = FundraiseState.Closed;
        emit FundraiseLiquidated(fundraises[_id].beneficiary);
    }

    function fund(uint48 _id, address _asset, uint amount) external{
        IERC20(_asset).transferFrom(msg.sender, address(this), amount);
        fundraises[_id].balances[_asset] += amount;
        addNewAsset(_id, _asset);
    }

    modifier onlyCreator (uint48 _id) {
        require(fundraises[_id].creator == msg.sender, "Fundraise can only be liquidated by its creator");
        _;
    }

    modifier onlyOpened (uint48 _id) {
        require(fundraises[_id].state == FundraiseState.Opened, "Fundraise already liquidated");
        _;
    }
}
