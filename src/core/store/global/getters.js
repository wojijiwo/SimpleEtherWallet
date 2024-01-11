import { chainMap, ETH } from '@/utils/networks';
import {
  getGasBasedOnType,
  getPriorityFeeBasedOnType,
  getBaseFeeBasedOnType,
  gasPriceTypes
} from '@/core/helpers/gasPriceHelper';
import { toBN } from 'web3-utils';
import { isEmpty } from 'lodash';
import { formatFiatValue } from '@/core/helpers/numberFormatHelper';

const Networks = function () {
  return chainMap;
};
const network = function (state) {
  return !isEmpty(chainMap[state.currentNetwork.chainId])
    ? chainMap[state.currentNetwork.chainId]
    : ETH;
};

const gasPriceByType =
  (state, getters) =>
  (type = 'economy') => {
    if (!getters.isEIP1559SupportedNetwork) {
      return getGasBasedOnType(state.baseGasPrice, type);
    }
    const priorityFee = getPriorityFeeBasedOnType(
      toBN(state.eip1559.maxPriorityFeePerGas),
      type
    );
    const baseFee = getBaseFeeBasedOnType(
      toBN(state.eip1559.baseFeePerGas),
      type
    );
    return baseFee.add(priorityFee).toString();
  };
const gasPrice = function (state, getters) {
  if (!getters.isEIP1559SupportedNetwork) {
    return getGasBasedOnType(state.baseGasPrice, state.gasPriceType);
  }
  return getters.gasFeeMarketInfo.maxFeePerGas.toString();
};

const isEthNetwork = function (state, getters) {
  return getters.network.chainId === ETH.chainId;
};
const isTestNetwork = function (state, getters) {
  return getters.network.isTestNetwork;
};

const localContracts = function (state, getters) {
  return state.localContracts[getters.network.chainId]
    ? state.localContracts[getters.network.chainId]
    : [];
};

const currencyConfig = (state, getters, rootState) => {
  const currency = state.preferredCurrency;
  const { currencyRate } = rootState.external;
  const rate = currencyRate.data ? currencyRate.data.exchange_rate : 1;
  return { currency, rate };
};

const getFiatValue =
  (state, getters) =>
  /**
   * @param {Number|String} value
   * @param {Object} options
   * @param {Boolean} options.doNotLocalize - formats value to currency, no rate
   * @returns - Formatted localized currency
   */
  (value, options = {}) => {
    const config = options.doNotLocalize
      ? { currency: getters.currencyConfig.currency }
      : getters.currencyConfig;
    return formatFiatValue(value, config).value;
  };

const isEIP1559SupportedNetwork = function (state) {
  return state.eip1559.baseFeePerGas !== '0';
};
const gasFeeMarketInfo = function (state) {
  const priorityFee = getPriorityFeeBasedOnType(
    toBN(state.eip1559.maxPriorityFeePerGas),
    state.gasPriceType
  );
  const maxPriorityFeePerGas = getPriorityFeeBasedOnType(
    toBN(state.eip1559.maxPriorityFeePerGas),
    gasPriceTypes.FAST
  );
  const baseFee = getBaseFeeBasedOnType(
    toBN(state.eip1559.baseFeePerGas),
    state.gasPriceType
  );
  return {
    baseFeePerGas: baseFee,
    maxFeePerGas: baseFee.add(priorityFee),
    priorityFeePerGas: priorityFee,
    maxPriorityFeePerGas
  };
};
export default {
  Networks,
  network,
  gasPrice,
  isEthNetwork,
  localContracts,
  currencyConfig,
  getFiatValue,
  isTestNetwork,
  isEIP1559SupportedNetwork,
  gasFeeMarketInfo,
  gasPriceByType
};
