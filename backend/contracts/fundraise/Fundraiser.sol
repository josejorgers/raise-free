// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./IFundraiser.sol";
import "./IToken.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


enum FundraiseState {
    Opened,
    Closed
}

contract Fundraiser is Ownable, IFundraiser{

    struct Fundraise {

        uint  id;
        address creator;
        address beneficiary;
        
        FundraiseState state;

        address[] assetAddresses;
        mapping(address => uint) balances;
    }

    Fundraise[] fundraises;
    
    function totalUniqueAssets(uint id) private view returns(uint) {
        return fundraises[id].assetAddresses.length;
    }

    function getAssetAddress(uint id, uint _i) private view returns(address){
        return fundraises[id].assetAddresses[_i];
    }

    function getAssetBalance(uint id, address asset) private view returns(uint){
        return fundraises[id].balances[asset];
    }
    function isAssetInFundraise(uint id, address asset) private view returns(bool){

        for(uint i = 0; i < fundraises[id].assetAddresses.length; i++)
            if(fundraises[id].assetAddresses[i] == asset)
                return true;
        return false;
    }

    function addNewAsset(uint id, address asset) private {
        if(!isAssetInFundraise(id, asset))
            fundraises[id].assetAddresses.push(asset);
    }
    

    // Info functions:

    function getFundraisingCreator(uint _id) external view returns(address) {
        return fundraises[_id].creator;
    }

    function getFundraisingBeneficiary(uint _id) external view returns(address) {
        return fundraises[_id].beneficiary;
    }

    function getFundraisingStatus(uint _id) external view returns(FundraiseState) {
        return fundraises[_id].state;
    }

    function getFundraisingAssets(uint _id) external view returns(address[] memory assets, uint[] memory amounts){
        uint len = totalUniqueAssets(_id);
        
        assets = new address[](len);
        amounts = new uint[](len);

        for(uint i = 0; i < len; i++){
            assets[i] = fundraises[_id].assetAddresses[i];
            amounts[i] = fundraises[_id].balances[assets[i]];
        }
        
    }
    //


    function addFundraising(address _beneficiary) public override returns(uint id){
        
        id = uint(fundraises.length);
        
        // Workaround to push a struct that has a nested mapping
        Fundraise storage fr = fundraises.push();
        fr.id = id;
        fr.creator = msg.sender;
        fr.beneficiary = _beneficiary;
        fr.state = FundraiseState.Opened;

        emit FundraiseCreated(id);
    }

    function liquidateFundraising(uint _id) public override onlyCreator(_id) onlyOpened(_id) {
        
        uint length = totalUniqueAssets(_id);

        for(uint i = 0; i < length; i++){

            address payable tokenAddr = payable(getAssetAddress(_id, i));
            if(tokenAddr != payable(address(this)))
                // Not a native token
                require(IERC20(tokenAddr).transfer(fundraises[_id].beneficiary, getAssetBalance(_id, tokenAddr)));
            else
                // Native token
                payable(fundraises[_id].beneficiary).transfer(getAssetBalance(_id, address(this)));

        }
        fundraises[_id].state = FundraiseState.Closed;
        emit FundraiseLiquidated(_id, fundraises[_id].beneficiary);
    }

    function fund(uint _id) payable public override {
        require(msg.value > 0, "Funding value must be greater than zero");

        fundraises[_id].balances[address(this)] += msg.value;
        addNewAsset(_id, address(this));
        emit FundraiseFunded(_id, msg.sender, address(this), msg.value);
    }

    function fundToken(uint _id, address _asset, uint amount) public override{
        require(IERC20(_asset).transferFrom(msg.sender, address(this), amount));
        fundraises[_id].balances[_asset] += amount;
        addNewAsset(_id, _asset);
        emit FundraiseFunded(_id, msg.sender, _asset, amount);
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "There are no funds to withdraw");

        for(uint i = 0; i < fundraises.length; i++)
            balance -= fundraises[i].balances[address(this)];
        
        require(balance > 0, "There are no funds to withdraw");  
        payable(msg.sender).transfer(balance);
    }

    receive() external payable {
    }

    modifier onlyCreator (uint _id) {
        require(fundraises[_id].creator == msg.sender, "Fundraise can only be liquidated by its creator");
        _;
    }

    modifier onlyOpened (uint _id) {
        require(fundraises[_id].state == FundraiseState.Opened, "Fundraise already liquidated");
        _;
    }
}
