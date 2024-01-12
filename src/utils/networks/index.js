import chainList from '@/_generated/chainlist.json';
import platformList from '@/_generated/asset_platformlist.json';

const platformMap = {};
Object.keys(platformList).forEach(key => {
  const t = platformList[key];
  platformMap[t.name] = t.native_coin_id;
  if (t.chain_identifier) {
    platformMap[t.chain_identifier] = t.native_coin_id;
  }
});

// add attributes to chainList array
Object.keys(chainList).forEach(key => {
  const chain = chainList[key];

  const chainName = chain.name.toLowerCase();
  chainList[key].isTestNetwork = chainName.includes('test') || chainName.includes('dev');
  chainList[key].tokens = import(
    `@/_generated/tokens/tokens-${chain.chainId}.json`
  )
    .then(val => val.default)
    // eslint-disable-next-line
    .catch(err => []);
  chainList[key].gasPriceMultiplier = 1;
  chainList[key].name_long = chain.name;
  chainList[key].currencyName = chain.nativeCurrency.symbol;
  // add coingeckoID
  if (platformMap[chain.name]) {
    chainList[key].coingeckoID = platformMap[chain.name];
  } else if (platformMap[chain.chainId]) {
    chainList[key].coingeckoID = platformMap[chain.chainId];
  } else {
    chainList[key].coingeckoID = null;
  }

  chainList[key].homePage = chain.infoURL;
  chainList[key].icon = chain.logoURI;

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
  chainMap[chainList[key].chainId] = chainList[key];
});

const ETH = chainMap[1];
const BSC = chainMap[56];
const MATIC = chainMap[137];

export { chainMap, ETH, BSC, MATIC };
