<template>
  <the-wrapper-wallet>
    <template #leftColItem1>
      <module-contract-interact />
    </template>
  </the-wrapper-wallet>
</template>

<script>
export default {
  name: 'InteracContractLayout',
  components: {
    TheWrapperWallet: () =>
      import('@/views/components-wallet/TheWrapperWallet'),
    ModuleContractInteract: () =>
      import('@/modules/contract/ModuleContractInteract')
  }
};
</script>
