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

const test = async () => {
    const TronWeb = require('tronweb')
    const {BigNumber} = require("ethers");
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider("https://api.nileex.io");
    const solidityNode = new HttpProvider("https://api.nileex.io");
    const eventServer = new HttpProvider("https://event.nileex.io");
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer,"7c7f4cbdb5b3111a197c63d237da69baa0077300bde700667c067dc92c90d288");
    const { abi } = await tronWeb.trx.getContract("TF17BgPaZYbz8oxbjhriubPDsA7ArKoLX3");
    const contract = tronWeb.contract(abi.entrys, "TF17BgPaZYbz8oxbjhriubPDsA7ArKoLX3");
    const resp = await contract.methods.transfer("TLqBSejfpqWeCv1oRLTgts5u9Q5JxiiG51", BigNumber.from("1000000000000000000") ).send();
    while(true){
        try {
            let a = await tronWeb.trx.getConfirmedTransaction(resp);
            break;
        } catch (e) {}
    }
    console.log(resp);
}

test()