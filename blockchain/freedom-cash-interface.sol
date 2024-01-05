// SPDX-License-Identifier: GNU AFFERO GENERAL PUBLIC LICENSE Version 3
pragma solidity 0.8.19;

interface IFreedomCash {
    function getBuyPrice(uint256 amountToBeBought) external view returns(uint256);
    function getSellPrice() external  view returns(uint256);
    function buyFreedomCash(uint256 fCAmount, uint256 fCBuyPrice) external payable;
    function sellFreedomCash(uint256 amount, uint256 sellPrice) external;
}