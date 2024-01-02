<template>
  <the-wrapper-wallet
    :total-left-col-items="2"
    :has-draggable="false"
    :total-right-col-items="2"
  >
    <template #leftColItem1>
      <div>
        <module-balance />
      </div>
    </template>
    <template #leftColItem2>
      <module-tokens />
    </template>
  </the-wrapper-wallet>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    ModuleBalance: () => import('@/modules/balance/ModuleBalance'),
    ModuleTokens: () => import('@/modules/balance/ModuleTokens'),
    TheWrapperWallet: () => import('@/views/components-wallet/TheWrapperWallet')
  },
  computed: {
    ...mapGetters('global', ['isEthNetwork'])
  }
};
</script>
