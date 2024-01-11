import web3 from 'web3';
import store from '@/core/store';
import {
  toChecksumAddress as toChecksumAddr,
} from 'ethereumjs-util';

const isAddress = address => {
  return (
    address && web3.utils.isHexStrict(address) && web3.utils.isAddress(address)
  );
};

const toChecksumAddress = address => {
  const chainId = store.getters['global/network'].chainId;
  // Use EIP-1191 Address Checksum if its Rootstock network
  if (chainId === ROOTSTOCK.chainID) {
    return toChecksumAddr(address, chainId);
  }

  return web3.utils.toChecksumAddress(address);
};
export { isAddress, toChecksumAddress };
