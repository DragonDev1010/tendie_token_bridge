require('chai')
    .use(require('chai-as-promised'))
    .should()

const {assert} = require('chai')

const BridgeBsc = artifacts.require('./BridgeBsc.sol')
const TokenBsc = artifacts.require('./TokenBsc.sol')

contract('TokenBsc Contract Test', (accounts) => {
    let b_tk
    let res
    before(async() => {
        b_tk = await TokenBsc.deployed()
    })
    it('Token BSC deployed test', async() => {
        res = await b_tk.name()
        assert.equal(res, 'BSC Token', 'bsc token name is correct.')
        res = await b_tk.symbol()
        assert.equal(res, 'BTK', 'bsc token symbol is correct')
    })
    it('Token BSC mint test', async() => {
        res = await b_tk.mint(accounts[0], 10000)
        res = await b_tk.balanceOf(accounts[0])
        assert.equal(res, 10000, "balanceof accounts[0] is correct")

        res = await b_tk.mint(accounts[1], 30000)
        res = await b_tk.balanceOf(accounts[1])
        assert.equal(res, 30000, "account[1] mint is correct")
    })
    it('Tokne BSC burn test', async() => {
        res = await b_tk.burn(accounts[0], 5000)
        res = await b_tk.balanceOf(accounts[0])
        assert.equal(res, 5000, 'token burn is working correctly')

        res = await b_tk.burn(accounts[1], 10000)
        res = await b_tk.balanceOf(accounts[1])
        assert.equal(res, 20000, 'accounts[1] burn is working correctly')
    })
})
contract('BridgeBsc Contract Test', (accounts) => {
    let b_bridge, b_tk
    let res
    before(async() => {
        b_bridge = await BridgeBsc.deployed()
        b_tk = await TokenBsc.deployed()
    })
    it('Token BSC deploy test', async() => {
        await b_tk.mint(accounts[1], 100000)
        await b_tk.burn(accounts[1], 100)

        await b_tk.updateAdmin(accounts[5])
        await b_tk.mint(accounts[3], 200000, {from: accounts[5]})
        await b_tk.burn(accounts[3], 100, {from: accounts[5]})

        let acc_1_balance = await b_tk.balanceOf(accounts[1])
        assert.equal(acc_1_balance, 99900, "mint and burn are working correctly")
        let acc_3_balance = await b_tk.balanceOf(accounts[3])
        assert.equal(acc_3_balance, 199900, "mint and burn are working correctly")
    })
    it('Bridge BSC Test', async() => {
        await b_tk.mint(accounts[0], 1000, {from: accounts[5]})
        await b_tk.updateAdmin(b_bridge.address, {from: accounts[5]})
        await b_bridge.burn(accounts[0], 100)
        res = await b_tk.balanceOf(accounts[0])
        assert.equal(res, 900, "bridge contract burn works correctly")
    })
})
