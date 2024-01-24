import NameResolver from '../index';
import Web3 from 'web3';
const web3Instance = new Web3('https://nodes.mewapi.io/rpc/eth');
const nameResolver = new NameResolver(
  {
    type: {
      ens: {
        registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
      }
    },
    url: 'https://nodes.mewapi.io/rpc/eth',
    port: 443
  },
  web3Instance
);

describe('Ethereum Name Resolver', () => {
  test('it should ens name: etwallet.eth', () => {
    return nameResolver.resolveName('etwallet.eth').then(addr => {
      expect(addr).toBe('TODO');
    });
  });
  test('it should cns name: etwallet.crypto', () => {
    return nameResolver.resolveName('etwallet.crypto').then(addr => {
      expect(addr).toBe('TODO');
    });
  });
  xtest('it should cns name: cofounding.zil', () => {
    return nameResolver.resolveName('cofounding.zil').then(addr => {
      expect(addr).toBe('TODO');
    });
  });
});
