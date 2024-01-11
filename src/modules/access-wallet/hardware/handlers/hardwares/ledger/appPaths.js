import { ETH } from '@/utils/networks';
import {
  ledgerEthereum,
  ledgerLiveEthereum
} from '@/modules/access-wallet/hardware/handlers/configs/configPaths';
const appList = [
  {
    network: ETH,
    paths: [ledgerEthereum, ledgerLiveEthereum]
  },
  {
    network: Object.assign({}, ETH, {
      name: 'Eth Recovery',
      name_long: 'Eth Recovery'
    }),
    paths: [ledgerEthereum, ledgerLiveEthereum]
  }
];
export default appList;
