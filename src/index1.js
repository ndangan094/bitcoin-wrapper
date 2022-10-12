const TronWeb = require("tronweb");

const TronClient = ({ privateKey }) => {
    const TronWeb = require('tronweb')
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.nileex.io");
    const solidityNode = new HttpProvider("https://api.nileex.io");
    const eventServer = new HttpProvider("https://event.nileex.io");
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
    return tronWeb;
}

const test = async ({ address }) => {
    const TronWeb = require('tronweb')
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.nileex.io");
    const solidityNode = new HttpProvider("https://api.nileex.io");
    const eventServer = new HttpProvider("https://event.nileex.io");
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer,"7c7f4cbdb5b3111a197c63d237da69baa0077300bde700667c067dc92c90d288");
    let contract = await tronWeb.contract().at(address);
    console.log(contract);
    let result = await Promise.all([contract.symbol().call(), contract.decimals().call()]);
    console.log({ symbol: result[0], decimals: result[1] }) ;
}

test({address:"TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj"})