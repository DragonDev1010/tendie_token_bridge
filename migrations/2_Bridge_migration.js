const TokenBsc = artifacts.require('TokenBsc.sol')
const BridgeBsc = artifacts.require('BridgeBsc.sol')

module.exports = async function (deployer, network, accounts) {
  // if(network === 'bscTestnet') {
    await deployer.deploy(TokenBsc)
    const tokenBsc = await TokenBsc.deployed()
    await tokenBsc.updateAdmin(accounts[0])
    const token_admin = await tokenBsc.getOwner()
    await deployer.deploy(BridgeBsc, tokenBsc.address)
    const bridgeBsc = await BridgeBsc.deployed()
  // }
};

