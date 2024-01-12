<template>
  <the-wrapper-wallet>
    <template #leftColItem1>
      <module-contract-deploy />
    </template>
    <!-- <template #rightColItem1>
      <module-swap-rates />
    </template> -->
  </the-wrapper-wallet>
</template>

<script>
export default {
  name: 'TheDeployContractLayout',
  components: {
    TheWrapperWallet: () =>
      import('@/views/components-wallet/TheWrapperWallet'),
    ModuleContractDeploy: () =>
      import('@/modules/contract/ModuleContractDeploy')
  }
};
</script>
