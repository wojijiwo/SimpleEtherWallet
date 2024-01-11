const chainList = import('@/_generated/chainlist.json').then(
  val => val.default
);

// add attributes to chainList array
Object.keys(chainList).forEach(key => {
  const chain = chainList[key];

  chainList[key].isTestNetwork = ['test', 'dev'].includes(chain.name);
  chainList[key].tokens = import(
    `@/_generated/tokens/tokens-${chain.chainId}.json`
  )
    .then(val => val.default)
    // eslint-disable-next-line
    .catch(err => []);
  chainList[key].gasPriceMultiplier = 1;
  chainList[key].name_long = chain.name;
  chainList[key].currencyName = chain.nativeCurrency.symbol;
  chainList[key].coingeckoID = null;
  chainList[key].homePage = chain.infoURL;

  if (chain.rpc.length > 0) {
    chainList[key].rpcUrl = chain.rpc[0]; // use first rpc endpoint
  }

  if (chain.explorers && chain.explorers.length > 0) {
    const url = chain.explorers[0].url;
    chainList[key].blockExplorer = url;
    chainList[key].blockExplorerTX = `$url/tx/[[txHash]]`;
    chainList[key].blockExplorerAddr = `$url/address/[[address]]`;
  }
});

const chainMap = {};
Object.keys(chainList).forEach(key => {
  chainMap[chainList[key].name] = chainList[key];
});

const ETH = chainMap[1];
const BSC = chainMap[56];
const MATIC = chainMap[137];

export { chainMap, ETH, BSC, MATIC };
