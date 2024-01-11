import Configs from '../configs';
import { toWei } from 'web3-utils';
import { ETH } from '@/utils/networks';
import { gasPriceTypes } from '@/core/helpers/gasPriceHelper';

const state = {
  localStore: true,
  Errors: {},
  online: true,
  linkQuery: {},
  locale: 'en_US',
  stateVersion: Configs.VERSION.global,
  gasLimitWarning: 100,
  baseGasPrice: toWei('41', 'gwei'),
  gasPriceType: gasPriceTypes.ECONOMY,
  currentNetwork: ETH,
  validNetwork: true,
  preferredCurrency: 'USD',
  localContracts: {},
  eip1559: {
    baseFeePerGas: '0',
    maxPriorityFeePerGas: '0'
  },
  testing: false,
  darkMode: false
};

export default state;
