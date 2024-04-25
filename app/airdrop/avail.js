import Web3 from "web3";
import axios from "axios";
import { getChain } from '../chain/chain.js'

let check = async (privateList) => {
    let chainId = 1
    let chains = getChain(chainId)
    if (chains.length == 0) {
        console.log("[错误]:没有添加链:", chainId);
    }
    let chainObj = chains[0]
    let web3 = new Web3(chainObj.chainUrl)

    let signMessage = "Greetings from Avail!\n\nSign this message to check your eligibility. This signature will not cost you any fees.\n\nTimestamp: ";
    let timestamp = Math.floor(Date.now() / 1000);

    let checkRewards = 'https://claim-api.availproject.org/check-rewards'
    for (let i = 0; i < privateList.length; i++) {
        let key = privateList[i];
        let account = web3.eth.accounts.privateKeyToAccount(key)
        let signed = account.sign(signMessage.concat(timestamp));
        // {"account":"0xea127f6a1e1f2896ac9af73d94a1ad8fd34ed2a0","type":"ETHEREUM","timestamp":1714055081,"signedMessage":"0x4bddc85dbdbc09382612cc08d71b21d03dbf08b702041a6f6ba29063f8be580260ebdb656ab2f7f588eff36e101862b42edd0d552069a558d2964977e986212a1b"}
        const rewards = await axios.post(`${checkRewards}`, { account: account.address, type: "ETHEREUM", timestamp: timestamp, signedMessage: signed.signature })
        console.log(`[${i}]:${account.address}`, rewards.data.message);
    }
}

//以太系列私钥
let privateList = ['']
check(privateList)