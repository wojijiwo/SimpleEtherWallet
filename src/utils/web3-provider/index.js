import GivenProvider from './providers/given-provider';
import WSProvider from './providers/ws-provider';
import WALLET_TYPES from '@/modules/access-wallet/common/walletTypes';
import VuexStore from '@/core/store';
class MEWProvider {
  constructor(host, options) {
    if (
      VuexStore.state.wallet &&
      VuexStore.state.wallet.identifier === WALLET_TYPES.WEB3_WALLET
    ) {
      return new GivenProvider(host, options);
    } else if (host && typeof host === 'string') {
      if (/^http(s)?:\/\//i.test(host)) {
        return new GivenProvider(host, options);
      } else if (/^ws(s)?:\/\//i.test(host)) {
        return new WSProvider(host, options);
      } else if (host) {
        throw new Error('Can\'t autodetect provider for "' + host + '"');
      }
    }
  }
}
export default MEWProvider;
