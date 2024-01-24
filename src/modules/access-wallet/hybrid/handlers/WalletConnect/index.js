import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { Transaction } from '@ethereumjs/tx';
import PromiEvent from 'web3-core-promievent';

import HybridWalletInterface from '../walletInterface';
import store from '@/core/store';
import { chainMap } from '@/utils/networks';
import WALLET_TYPES from '@/modules/access-wallet/common/walletTypes';
import {
  sanitizeHex,
  getBufferFromHex
} from '@/modules/access-wallet/common/helpers';
import errorHandler from './errorHandler';
import commonGenerator from '@/core/helpers/commonGenerator';
import toBuffer from '@/core/helpers/toBuffer';
import walletconnect from '@/assets/images/icons/wallets/walletconnect.svg';
import { BSC, ETH, MATIC } from '@/utils/networks';

// eslint-disable-next-line
const projectId = WALLET_CONNECT_PROJECT_ID;
const IS_HARDWARE = false;
class WalletConnectWallet {
  constructor(signClient, identifier) {
    this.identifier = identifier;
    this.isHardware = IS_HARDWARE;
    this.client = signClient;
    this.client.on('session_delete', () => {
      store.dispatch('wallet/removeWallet');
    });

    this.meta = {
      name: 'Wallet Connect',
      img: {
        type: 'img',
        value: walletconnect
      }
    };
  }
  init() {
    // eslint-disable-next-line
    return new Promise(async resolve => {
      const txSigner = tx => {
        const from = tx.from;
        tx = new Transaction(tx, {
          common: commonGenerator(store.getters['global/network'])
        });
        const txJSON = tx.toJSON();
        txJSON.from = from;
        const prom = PromiEvent(false);
        this.client
          .request({ method: 'eth_sendTransaction', params: [txJSON] })
          .then(hash => {
            prom.eventEmitter.emit('transactionHash', hash);
            store.state.wallet.web3.eth.sendTransaction.method._confirmTransaction(
              prom,
              hash,
              { params: [txJSON] }
            );
          })
          .catch(err => {
            prom.reject(
              err.message === '' && err.code === 0
                ? prom.reject('User cancelled')
                : err
            );
          });
        return prom.eventEmitter;
      };
      const msgSigner = msg => {
        return new Promise((resolve, reject) => {
          const msgParams = [
            sanitizeHex(store.state.wallet.address),
            '0x' + toBuffer(msg).toString('hex')
          ];
          this.client
            .request({ method: 'eth_sign', params: msgParams })
            .then(result => {
              resolve(getBufferFromHex(sanitizeHex(result)));
            })
            .catch(err => {
              reject(
                err.message === '' && err.code === 0
                  ? reject('User cancelled')
                  : err
              );
            });
        });
      };
      resolve(
        new HybridWalletInterface(
          sanitizeHex(this.client.accounts[0]),
          this.isHardware,
          this.identifier,
          txSigner,
          msgSigner,
          this.client,
          errorHandler,
          this.meta
        )
      );
    });
  }
}
const createWallet = async (identifier = WALLET_TYPES.WALLET_CONNECT) => {
  const allChainIds =
    identifier === WALLET_TYPES.WALLET_CONNECT
      ? Object.values(chainMap)
          .map(item => {
            if (item.chainId !== 1) {
              return item.chainId;
            }
          })
          .filter(item => !!item)
      : [BSC.chainId, MATIC.chainId];
  const signClient = await EthereumProvider.init({
    projectId,
    showQrModal: true,
    chains: [ETH.chainId],
    optionalChains: allChainIds,
    methods: ['eth_sendTransaction', 'eth_sign'],
    events: ['chainChanged', 'accountsChanged'],
    metadata: {
      name: 'ETWallet Inc',
      description:
        'ETWallet is a free, open-source, client-side interface for generating Ethereum wallets & more. Interact with the Ethereum blockchain easily & securely.',
      url: 'https://etwallet.xyz',
      icons: ['https://www.etwallet.xyz/favicon.png']
    },
    qrModalOptions: {
      themeVariables: {
        '--wcm-z-index': 300
      }
    }
  });
  if (signClient.connected) {
    signClient.disconnect();
  }

  signClient.on('connect', evt => {
    const { chainId } = evt;
    const foundNode = Object.values(chainMap).find(item => {
      if (item.chainId === parseInt(chainId)) return item;
    });
    if (foundNode) {
      store
        .dispatch('global/setNetwork', {
          network: foundNode,
          walletType: identifier
        })
        .then(() => {
          store.dispatch('wallet/setWeb3Instance');
        });
    }
  });
  await signClient.connect().catch(e => {
    throw e;
  });

  const walletConnectWallet = new WalletConnectWallet(signClient, identifier);
  const _tWallet = await walletConnectWallet.init();
  return _tWallet;
};
createWallet.errorHandler = errorHandler;

export default createWallet;
