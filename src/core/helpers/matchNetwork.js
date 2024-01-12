import { ERROR, Toast } from '@/modules/toast/handler/handlerToast';
import { toHex } from 'web3-utils';
import wallets from '@/modules/access-wallet/common/walletTypes';

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
  console.log('matchNetwork.js: ', chainId, walletType, passedProvider, options);

  const { ethereum } = window;
  const provider = passedProvider || ethereum;
  const isMetaMask =
    provider &&
    provider.isMetaMask &&
    !provider.hasOwnProperty('isTrust') &&
    !provider.hasOwnProperty('isMEWwallet');
  const isMEWwallet = provider && provider.isMetaMask && provider.isMEWwallet;
  if (walletType === wallets.WEB3_WALLET && (isMetaMask || isMEWwallet)) {
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
      console.log('matchNetwork.js: ', message);
      let toastMsg = ' ';
      let toastLink = {};
      if (message && options.toast) {
        if (message.includes('pending')) {
          toastMsg =
            'There is a pending request to MetaMask, make your selection before continuing';
        } else if (message.includes('adding')) {
          toastLink = {
            title:
              "It seems like you don't have this network set up in MetaMask. Please go here to add the network.",
            url: 'https://chainlist.org/'
          };
        } else if (message.includes('rejected')) return false;
        else if (message.includes("hasn't been added")) {
          toastLink = {
            title:
              "It seems like you don't have this network set up in your wallet. Please go here to add the network.",
            url: 'https://chainlist.org/'
          };
        } else {
          toastMsg = 'There was a problem processing your request to MetaMask';
        }
        setTimeout(() => {
          Toast(toastMsg, toastLink, ERROR, 5000);
        }, 100);
      }
      return false;
    }
  }
  return true;
};
