  /* SPDX-License-Identifier: GNU AFFERO GENERAL PUBLIC LICENSE Version 3

Total Supply:   369.369.369 Freedom Cash (FREEDOMCASH)

Utility:        Freedom Cash is the currency for the Freedom Enterprise. 
                Freedom Cash supports peer to peer collaboration while preventing pump and dump frauds.  
                Reduce dependency from exchanges by adding a buy and sell function within the smart contract itself.  
                This allows to define a reasonable pricing algorithm and ensures that people do not need to waste 
                gas-, liquidity provider- and exchange fees.  

Liquidity:      The total supply of Freedom Cash is minted not to the developer or 
                deployer but to the smart contract itself (see constructor address(this)). 
                ETH liquidity is accrued automatically (see buy and sell function). 

"Regulators":   Please think for yourself about the following while you go for a walk offline: 
                The crimes of the "governments" you worked for, seem much more dangerous to humanity 
                than the crimes which abuse freedom and privacy of money. 
                We believe in peace over war. We believe in freedom over totalitarianism.
                We believe in reasonable good police officers over kyc and total surveillance.
                We believe in free humans.
                You have proved that all your kyc, censorship, propaganda and visions of 
                totalitarian state money called CBDC do not succeed. 
                Even if you do not fully understand how we solve things yet,
                even if you do not like us, even if you cannot feel the hearts of free humans in your heart, 
                we invite you to join us, learn with us, help us and enjoy also
                the technical pulses of freedom block by block by block by block by block by block 
                by block by block by block
                
Wish:           Everyone who reads this with the best of intentions shall always have enough 
                Freedom Cash stored within self hosted paperwallets which shall be utilized 
                for fruitful and fair exploration of truth and peer to peer collaboration. 
                Please make Freedom Cash an homage to all who play for freedom and invest 
                some Finney right now. Start small and talk about Freedom. 
                We wish you all the best. */    

pragma solidity 0.8.19;
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.4/contracts/token/ERC20/ERC20.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.4/contracts/utils/math/Math.sol";

contract FreedomCash is ERC20 {

    error SellPriceMightHaveDropped();
    error BuyPriceMightHaveRisen();
    error TransferOfETHFailed();
    
    constructor() ERC20("Freedom Cash", "FREEDOMCASH") {
        _mint(address(this), 369369369 * 10 ** decimals()); // into contract itself 
    }
    function getBuyPrice(uint256 amountToBeBought) public view returns(uint256){
        uint256 underway = totalSupply() - balanceOf(address(this));    
        uint256 toBeUnderway = underway + amountToBeBought;
        return Math.mulDiv(9 * 10**9, toBeUnderway, 10**18);
    }
    function getSellPrice() public view returns(uint256) {
        uint256 underway = totalSupply() - balanceOf(address(this)); 
        if (underway == 0) { return 0; }
        return Math.mulDiv(address(this).balance, 10**18, underway);
    }   
    function buyFreedomCash(uint256 fCAmount, uint256 fCBuyPrice) public payable {
        uint256 check = Math.mulDiv(msg.value, 10**18, fCBuyPrice); 
        if (check != fCAmount) { revert BuyPriceMightHaveRisen(); }
        this.transfer(msg.sender, fCAmount);
    }
    function sellFreedomCash(uint256 amount, uint256 sellPrice) public {
        if (getSellPrice() < sellPrice) { revert SellPriceMightHaveDropped(); }
        uint256 amountOfETHToBeSent = Math.mulDiv(amount, getSellPrice(), 10**18); 
        if (allowance(msg.sender, address(this)) < amount) approve(address(this), amount);
        IERC20(address(this)).transferFrom(msg.sender, address(this), amount);
        (bool sent, ) = msg.sender.call{value: amountOfETHToBeSent}("Freedom Cash");
        if (sent == false) { revert TransferOfETHFailed(); }
    }
}