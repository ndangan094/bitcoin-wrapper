const CryptoAccount = require("send-crypto");
const { ECPairFactory } = require('ecpair');
const tinysecp = require('tiny-secp256k1');
const ECPair = ECPairFactory(tinysecp);
require("babel-core/register");
require("babel-polyfill");
class BitcoinWrapper {

    async generateAddressMainnetFromWIF(wif) {
        const keyPair = ECPair.fromWIF(wif);
        const account = new CryptoAccount(keyPair.privateKey);
        return await account.address("BTC");
    }

    async generateAddressTestnetFromWIF(wif) {
        const keyPair = ECPair.fromWIF(wif);
        const account = new CryptoAccount(keyPair.privateKey, {
            network: "testnet",
        });
        return await account.address("BTC");
    }

    async getBalanceMainnet(wif) {
        const keyPair = ECPair.fromWIF(wif);
        const account = new CryptoAccount(keyPair.privateKey);
        return await account.getBalance("BTC");
    }

    async getBalanceTestnet(wif) {
        const keyPair = ECPair.fromWIF(wif);
        const account = new CryptoAccount(keyPair.privateKey, {
            network: "testnet",
        });
        return await account.getBalance("BTC");
    }

    async sendBTCMainnet(wif, amount, addressTo) {
        const keyPair = ECPair.fromWIF(wif);
        const account = new CryptoAccount(keyPair.privateKey);
        const txHash = await account
            .send(addressTo, amount, "BTC")
            .on("transactionHash", (e) => { return e })

    }

    async sendBTCTestnet(wif, amount, addressTo) {
        const keyPair = ECPair.fromWIF(wif);
        const account = new CryptoAccount(keyPair.privateKey, {
            network: "testnet",
        });
        const txHash = await account
            .send(addressTo, amount, "BTC")
            .on("transactionHash", (e) => { return e })

    }
}
module.exports = BitcoinWrapper;

window.bitcoinwrapper = {
    provide: BitcoinWrapper
}