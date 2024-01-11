import Common, { Hardfork } from '@ethereumjs/common';

const commonGenerator = network => {
  return Common.custom({
    chainId: network.chainId,
    defaultHardfork: Hardfork.London
  });
};

export default commonGenerator;
