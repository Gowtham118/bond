// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
interface nftLender{
    function mint(address) external ;
}

contract bond{
    AggregatorV3Interface priceFeed;
    address owner;
    uint minimumBlockSpan;
    uint totalSupply;
    uint remainingSupply;
    uint lenderBlockCount = 128;
    address cpgAddress = 0x150520503Ae8b49bFE5EFBefAFaBac86e093715B;
    uint totalInterest;
    uint totalSupplyInCPG;
    uint totalOutstandingShares;
    uint interest;
    uint totalFundsInCPG;
    uint minTimeSpan;
    uint maxTimeSpan;
    uint punish;
    uint primaryTokenBalance;
    constructor(){
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    }
    mapping(address => uint) userShareinCPG;
    mapping(address => uint256) lenderWethBalance;
    mapping(address => uint) blockNumber;
    mapping(address => uint256) userShare;
    mapping(address => mapping(address => uint256)) borrowerTokenAmount;
    mapping(address => mapping(address => uint256)) borrowerOutstandingTokenAmount;
    mapping(address => address) borrowerToken;
    mapping(address => uint256) borrowTimeStamp;

    modifier isOwner(address _sender){
       require (owner == _sender,"Sender is not the owner");
       _;
    }
    fallback() external payable{
        
    } 
    receive() external payable{
        lenderWethBalance[msg.sender] = msg.value;
        blockNumber[msg.sender] = block.number;
        if(totalOutstandingShares == 0){
            primaryTokenBalance = msg.value;
            totalOutstandingShares = msg.value*getLatestPrice()/10e8;
            userShare[msg.sender] = msg.value;
            userShareinCPG[msg.sender] = msg.value*getLatestPrice()/10e8;
            totalSupplyInCPG = msg.value*getLatestPrice()/10e8;
            
        }
        else{
            primaryTokenBalance += msg.value;
            userShareinCPG[msg.sender] = msg.value*getLatestPrice()/10e8 * totalOutstandingShares/totalSupplyInCPG;
            userShare[msg.sender] = msg.value;
            totalSupplyInCPG += msg.value*getLatestPrice()/10e8;
            totalOutstandingShares += userShare[msg.sender];

        }
        ERC20(cpgAddress).approve(address(this),msg.value*getLatestPrice()/10e8);
        ERC20(cpgAddress).transferFrom(address(this),msg.sender,msg.value*getLatestPrice()/10e8);
    }
    function getBorrowerTimeStamp(address _user) public view returns(uint256){
        return borrowTimeStamp[msg.sender];
    }
    function getBorrowedAmount(address _token) public view returns(uint256){
        return borrowerTokenAmount[msg.sender][_token];
    }
    function getLatestPrice() public view returns (uint) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return uint(price);
    }
    function blockOfUser() view external returns(uint){
        return blockNumber[msg.sender];
    }
    function updateInterest(uint _interest) public{
        interest = _interest;
    }
    function lendedAmount() view external returns(uint256){
        return lenderWethBalance[msg.sender];

    }

    function changeMinimumBlockSpan(uint _blockSpan) external isOwner(msg.sender){
        minimumBlockSpan = _blockSpan; 
    }

    function changeOwner(address _ownerNew) external isOwner(msg.sender){
        owner = _ownerNew;
    }
    function borrow(string memory _symbol,address _token,uint _value) external payable{
        borrowerTokenAmount[msg.sender][_token] +=_value;
        borrowerOutstandingTokenAmount[msg.sender][_token] +=_value;
        borrowerToken[msg.sender] = _token;
        borrowTimeStamp[msg.sender] = block.timestamp;
        ERC20(cpgAddress).approve(msg.sender,_value);
        ERC20(cpgAddress).transferFrom(msg.sender,address(this),_value);
        totalFundsInCPG += _value;
        totalSupplyInCPG = totalSupplyInCPG + interest/100 * _value;
        if(keccak256(abi.encodePacked((_symbol))) == keccak256(abi.encodePacked(("ETH")))){
            primaryTokenBalance -= _value;
            payable(msg.sender).transfer(_value/(getLatestPrice()/10e8)*(100-interest)/100);
        }
    }
    function claimNft() external{
        if(block.number > blockNumber[msg.sender] + lenderBlockCount){
            nftLender nft= nftLender(0x091a51142D3e3da42997906CF83cBf40fBaE6bA7);
            nft.mint(msg.sender);
        }
    }
    function updateTimeSpan(uint _timeSpan) external isOwner(msg.sender){
        minTimeSpan = _timeSpan;
    }
    function repayLender() external payable{
        if(block.timestamp > blockNumber[msg.sender] + lenderBlockCount){
            require(primaryTokenBalance > userShare[msg.sender] , "Not enough balance");
            lenderWethBalance[msg.sender] = 0;
            blockNumber[msg.sender] = block.number;
            totalOutstandingShares -= userShare[msg.sender];
            totalSupplyInCPG -= userShareinCPG[msg.sender];
            payable(msg.sender).transfer(userShare[msg.sender]/(getLatestPrice()/10e8)*(100-interest)/100);
            primaryTokenBalance -= userShare[msg.sender];
            uint accrue = userShareinCPG[msg.sender]*totalSupplyInCPG/totalOutstandingShares;
            userShareinCPG[msg.sender] = 0;
            userShare[msg.sender] = 0;
        }
    }
    function updatePunish(uint _punish) external isOwner(msg.sender){
        punish = _punish;
    }
    function repayDept(address _token,uint _value) external payable{
        require((block.timestamp - borrowTimeStamp[msg.sender] > minTimeSpan),"Time span has not been reached");
        if(block.timestamp - borrowTimeStamp[msg.sender] < maxTimeSpan) {
            borrowerOutstandingTokenAmount[msg.sender][_token] += punish * borrowerOutstandingTokenAmount[msg.sender][_token];
        }
        else{
            ERC20(_token).approve(msg.sender,_value);
            ERC20(_token).transferFrom(msg.sender,address(this),_value);
            totalFundsInCPG -= _value;
            if(borrowerOutstandingTokenAmount[msg.sender][_token] - _value == 0){
                ERC20(cpgAddress).transfer(msg.sender,borrowerTokenAmount[msg.sender][_token]*(100-(interest+5))/100);
                delete borrowerOutstandingTokenAmount[msg.sender][_token];
                delete borrowerTokenAmount[msg.sender][_token];
                delete borrowerToken[msg.sender];
            }
            else{
                borrowerTokenAmount[msg.sender][_token] -= _value;
            }

        //event remaining


            totalSupplyInCPG = totalSupplyInCPG - interest/100 * _value;
            payable(msg.sender).transfer(_value/(getLatestPrice()/10e8)*(100-interest)/100);
        }
    }
    function interestEarned() public view returns (uint){
        uint interestEarnedByUser = (userShareinCPG[msg.sender]/totalOutstandingShares * totalSupplyInCPG) - userShare[msg.sender]*getLatestPrice()/10e8;
    }


}
