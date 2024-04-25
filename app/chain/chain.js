let chainList = []
chainList.push(
    {
        chainId: 1,
        chainUrl: "https://rpc.ankr.com/eth",
    }
)
const getChain = (chainId) => {
    return chainList.filter(item => item.chainId===chainId)
}
export { getChain }