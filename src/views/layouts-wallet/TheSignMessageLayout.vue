<template>
  <the-wrapper-wallet>
    <template #leftColItem1>
      <module-message />
    </template>
  </the-wrapper-wallet>
</template>

<script>
export default {
  components: {
    ModuleMessage: () => import('@/modules/message/ModuleMessageSign'),
    TheWrapperWallet: () => import('@/views/components-wallet/TheWrapperWallet')
  }
};
</script>
