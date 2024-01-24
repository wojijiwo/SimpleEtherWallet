import { ERROR, Toast } from '@/modules/toast/handler/handlerToast';
import { toHex } from 'web3-utils';
import wallets from '@/modules/access-wallet/common/walletTypes';
import { chainMap } from '@/utils/networks';

/**
 * Attempts to switch metamask network to current mew network.
 * Informs user of pending or unknown networks.
 */

/**
 * @param {Number} chainId - Chain Id for network
 * @param {String} walletType - Wallet type
 * @param {Boolean} options.toast - Show toast
 * @return {Boolean} returns false if networks do not match, true if they do, or if its not a web3 wallet
 */
export default async (
  chainId,
  walletType,
  passedProvider,
  options = { toast: true }
) => {
  const { ethereum } = window;
  const provider = passedProvider || ethereum;
  const isMetaMask =
    provider &&
    provider.isMetaMask &&
    !provider.hasOwnProperty('isTrust') &&
    !provider.hasOwnProperty('isETWallet');
  const isETWallet = provider && provider.isMetaMask && provider.isETWallet;
  if (walletType === wallets.WEB3_WALLET && (isMetaMask || isETWallet)) {
    try {
      if (chainId) {
        const data = { chainId: toHex(chainId) };
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [data]
        });
        return true;
      }
      return false;
    } catch (er) {
      const { message } = er;
      let toastMsg = ' ';
      // let toastLink = {};
      if (message && options.toast) {
        if (message.includes('pending')) {
          toastMsg =
            'There is a pending request to MetaMask, make your selection before continuing';
        } else if (message.includes('rejected')) {
          return false;
        } else if (message.includes("wallet_addEthereumChain")) {
          const c = chainMap[chainId];
          if (!c) {
            toastMsg = 'Chain with ChainID ' + chainId + ' not found.';
          } else {
            const result = await provider.request({
              method: 'wallet_addEthereumChain',
              params: [{
                "chainId": toHex(chainId),
                "chainName": c.name,
                "rpcUrls": c.rpc,
                "iconUrls": [c.logoURI],
                "nativeCurrency": c.nativeCurrency,
                "blockExplorerUrls": c.explorers.map(e => typeof e === 'string' ? e : e.url)
              }]
            });
            if (result === null) {
              return true;
            }
            toastMsg = 'Add chain to MetaMask failed with code: ' + result;
          }
        } else {
          toastMsg = 'There was a problem processing your request to MetaMask';
        }
        setTimeout(() => {
          Toast(toastMsg, null, ERROR, 5000);
        }, 100);
      }
      return false;
    }
  }
  return true;
};
