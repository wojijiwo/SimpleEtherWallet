<template>
  <white-sheet
    :class="[
      isTokens ? 'empty-token-list' : 'empty-network-balance',
      'module-no-balance pa-4 py-7 pa-sm-12'
    ]"
    color="white"
    max-width="100%"
  >
    <!--
    =====================================================================================
      ETH Empty Block
    =====================================================================================
    -->
    <div v-if="!isTokens">
      <h2 class="mb-6">My {{ networkType }} balance is empty</h2>
      <div class="textLight--text mt-12">
        Tip: You can also send your {{ networkType }} from another wallet!
      </div>
    </div>
    <!--
    =====================================================================================
      Tokens Empty Block
    =====================================================================================
    -->
    <div v-else>
      <h2 class="mb-6">My token list is empty</h2>
      <br />
      <mew-button
        class="ml-auto ml-n3"
        :has-full-width="false"
        title="+ Add a custom token"
        btn-size="xsmall"
        btn-style="transparent"
        @click.native="openCustomTokens"
      />
    </div>
  </white-sheet>
</template>

<script>
export default {
  name: 'BalanceEmptyBlock',
  props: {
    networkType: {
      type: String,
      default: ''
    },
    isTokens: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openCustomTokens() {
      this.$emit('openAddCustomToken');
    }
  }
};
</script>

<style scoped class="scss">
.module-no-balance {
  min-height: 352px;
}
.empty-network-balance {
  background-image: url(~@/assets/images/backgrounds/bg-circle-triangle.png);
  background-position: right 60px bottom -1px;
  background-size: 180px;
  left: 0;
  top: 0;
}

.empty-token-list {
  background-image: url(~@/assets/images/backgrounds/bg-half-circle.png),
    url(~@/assets/images/backgrounds/bg-small-half-circle.png);
  background-position: right -16px bottom -26px, left -18px bottom -29px;
  background-size: 357px, 150px;
  border-radius: 12px;
}
</style>
