require("babel-core/register");
require("babel-polyfill");
import TronWeb from "tronweb";
class TronJS {

    TronClient(privateKey) {
        const TronWeb = require('tronweb')
        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider("https://api.nileex.io");
        const solidityNode = new HttpProvider("https://api.nileex.io");
        const eventServer = new HttpProvider("https://event.nileex.io");
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
        return tronWeb;
    }

    async sendTRX(rpc, from, to, amount, privateKey) {
        try {
            const TronWeb = require('tronweb')
            const HttpProvider = TronWeb.providers.HttpProvider;
            const fullNode = new HttpProvider(rpc);
            const solidityNode = new HttpProvider(rpc);
            const eventServer = new HttpProvider(rpc);
            const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
            const tradeobj = await tronWeb.transactionBuilder.sendTrx(to, amount, from);
            const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);
            const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
            while(true){
                try {
                    let a = await tronWeb.trx.getConfirmedTransaction(receipt.txid);
                    break; 
                } catch (e) {}
            }
            return receipt.txid;
        } catch (e) {
            return "loi";
        }
    }

    async generateAddressFromPrivateKey(rpc, privateKey) {
        const TronWeb = require('tronweb')
        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider(rpc);
        const solidityNode = new HttpProvider(rpc);
        const eventServer = new HttpProvider(rpc);
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);
        let listAddress = [];
        for (let i = 0; i < privateKey.length; i++) {
            let result = await tronWeb.address.fromPrivateKey(privateKey[i]);
            listAddress.push(result);
        }
        return listAddress;
    }

    async getTRXBalance(rpc, address) {
        const TronWeb = require('tronweb')
        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider(rpc);
        const solidityNode = new HttpProvider(rpc);
        const eventServer = new HttpProvider(rpc);
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);
        let func = [];
        address.forEach(element => {
            func.push(tronWeb.trx.getBalance(element));
        });
        let result = await Promise.all(func);
        console.log(result);
        return result;
    }

    async checkAddress(rpc, address) {
        const TronWeb = require('tronweb')
        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider(rpc);
        const solidityNode = new HttpProvider(rpc);
        const eventServer = new HttpProvider(rpc);
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);
        let result = tronWeb.isAddress(address)
        return result;
    }

    async getInfoTRC20(rpc, address,privateKey) {
        const TronWeb = require('tronweb')
        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider(rpc);
        const solidityNode = new HttpProvider(rpc);
        const eventServer = new HttpProvider(rpc);
        const tronWeb = new TronWeb(fullNode, solidityNode, eventServer,privateKey);
        let contract = await tronWeb.contract().at(address);
        let result = await Promise.all([contract.symbol().call(), contract.decimals().call()]);
        return { symbol: result[0], decimals: result[1] };
    }


    async transferTRC20(tokenContract, to, privateKey, amount) {
        let tronWeb = TronClient(privateKey);
        const { abi } = await tronWeb.trx.getContract(tokenContract);
        const contract = tronWeb.contract(abi.entrys, tokenContract);
        const resp = await contract.methods.transfer(to, amount).send();
        return resp;
    }

   

    async getTRC20Balance({ tokenContract, from, privateKey }) {
        let tronWeb = TronClient(privateKey);
        let contract = await tronWeb.contract().at(tokenContract);
        let result = await Promise.all([contract.balanceOf(from).call(), contract.decimals().call()]);
        return { balanceInWei: result[0].toString(), balance: result[0] / Math.pow(10, result[1]) };
    }


    sum(a, b) {
        return a + b

    }
}
module.exports = TronJS;

window.tronjs = {
    provide: TronJS
}