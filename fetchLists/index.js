const fetch = require('node-fetch');
const fs = require('fs');
const configs = require('./configs');
const v4 = require('uuid').v4;
if (!fs.existsSync(configs.GENERATED_FOLDER_PATH)) {
  fs.mkdirSync(configs.GENERATED_FOLDER_PATH);
}
const getFormattedList = async (url, network) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': v4()
    }
  });
  const data = await response.json();
  const tokens = Object.values(data.tokens).reduce((currVal, t) => {
    if (t && t.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
      t.contract_address = t.address.toLowerCase();
      t.icon = t.logoURI;
      t.network = network;
      delete t.logoURI;
      delete t.chainId;

      currVal.push(t);
    }
    return currVal;
  }, []);
  return tokens;
};

const fetchOneInchLists = async () => {
  const ethTokens = await getFormattedList(
    'https://partners.mewapi.io/oneinch/v5.2/1/tokens',
    1
  );
  const bscTokens = await getFormattedList(
    'https://partners.mewapi.io/oneinch/v5.2/56/tokens',
    56
  );
  const maticTokens = await getFormattedList(
    'https://partners.mewapi.io/oneinch/v5.2/137/tokens',
    137
  );
  return {
    1: ethTokens,
    56: bscTokens,
    137: maticTokens
  };
};
const fetchCGtokenList = async () => {
  const ethTokens = await getFormattedList(
    'https://tokens.coingecko.com/ethereum/all.json',
    1
  );
  const bscTokens = await getFormattedList(
    'https://tokens.coingecko.com/binance-smart-chain/all.json',
    56
  );
  const maticTokens = await getFormattedList(
    'https://tokens.coingecko.com/polygon-pos/all.json',
    137
  );
  return {
    1: ethTokens,
    56: bscTokens,
    137: maticTokens
  };
};

const fetchChainList = async () => {
  try {
    const chainList = await fetch('https://cdn.jsdelivr.net/gh/etwalletxyz/chainlist/dist/chainlist.json')
      .then(res => res.json())
      .catch(err => console.log(err));
    fs.writeFileSync(
      `${configs.GENERATED_FOLDER_PATH}/chainlist.json`,
      JSON.stringify(chainList)
    );
  } catch (e) {
    console.error(e); // todo replace with proper error
  }
};

const fetchTokenList = async () => {
  try {
    if (!fs.existsSync(configs.TOKENS_PATH)) {
      fs.mkdirSync(configs.TOKENS_PATH);
    }

    const oneInchTokens = await fetchOneInchLists();
    const CGTokens = await fetchCGtokenList();

    const oneInchNetworks = Object.keys(oneInchTokens);
    const networkTokens = {};
    for (const network of oneInchNetworks) {
      if (!networkTokens[network]) networkTokens[network] = {};
      oneInchTokens[network].forEach(t => {
        t.address = t.address.toLowerCase();
        if (!networkTokens[network][t.address]) {
          networkTokens[network][t.address] = t;
        } else if (!networkTokens[network][t.address].icon) {
          networkTokens[network][t.address].icon = t.icon;
          networkTokens[network][t.address].icon_png = t.icon_png;
        }
      });
    }
    const CGNetworks = Object.keys(CGTokens);
    for (const network of CGNetworks) {
      if (!networkTokens[network]) networkTokens[network] = {};
      CGTokens[network].forEach(t => {
        t.address = t.address.toLowerCase();
        if (!networkTokens[network][t.address]) {
          networkTokens[network][t.address] = t;
        } else if (!networkTokens[network][t.address].icon) {
          networkTokens[network][t.address].icon = t.icon;
          networkTokens[network][t.address].icon_png = t.icon_png;
        }
      });
    }

    const networks = Object.keys(networkTokens);
    for (const network of networks) {
      console.log('Writing tokens for the network: ' + network);
      fs.writeFileSync(
        `${configs.TOKENS_PATH}/tokens-${network}.json`,
        JSON.stringify(Object.values(networkTokens[network]))
      );
    }
  } catch (e) {
    console.error(e); // Not captured by sentry
  }
};

const fetchPlatformCoinList = async () => {
  const list = await fetch(
    'https://api.coingecko.com/api/v3/coins/list?include_platform=true'
  )
    .then(res => res.json())
    .then(l => {
      const idmap = {};
      l.forEach(t => {
        const vals = Object.values(t.platforms);
        vals.forEach(val => {
          if (val && !idmap[val]) idmap[val] = t.id;
        });
      });
      return idmap;
    })
    .catch(console.error);
  fs.writeFileSync(
    configs.GENERATED_FOLDER_PATH + '/platformlist.json',
    JSON.stringify(list)
  );
};

const fetchAssettforms = async () => {
  const list = await fetch(
    'https://api.coingecko.com/api/v3/asset_platforms'
  )
    .then(res => res.json())
    .catch(console.error);
  fs.writeFileSync(
    configs.GENERATED_FOLDER_PATH + '/asset_platformlist.json',
    JSON.stringify(list)
  );
};

const run = async () => {
  await fetchChainList().then(fetchTokenList).then(fetchPlatformCoinList).then(fetchAssettforms);
};

(async () => {
  try {
    await run();
    console.log('Done');
  } catch (e) {
    console.error(e);
  }
})();
