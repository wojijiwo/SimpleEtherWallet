<template>
  <div class="module-network-switch full-width">
    <v-row
      v-if="hasNetworks"
      class="align-end justify-center justify-sm-space-between pa-0"
    >
      <!-- ===================================================================================== -->
      <!-- Toggle: Main/Test/All -->
      <!-- ===================================================================================== -->
      <div
        class="align-center align-sm-end justify-center pr-sm-3 pb-sm-3 order-sm-2 mt-10 mt-sm-0"
      >
        <v-btn-toggle
          v-model="toggleType"
          mandatory
          active-class="buttonToggleDark white--text alig-end"
        >
          <v-btn small>Main</v-btn>
          <v-btn small>Test</v-btn>
          <v-btn small>All</v-btn>
        </v-btn-toggle>
      </div>

      <!-- ===================================================================================== -->
      <!-- Search Data -->
      <!-- ===================================================================================== -->
      <v-col cols="12" sm="7" class="order-sm-1">
        <mew-search
          placeholder="Find Network"
          :value="searchInput"
          @input="setSearch"
        />
      </v-col>
    </v-row>

    <!-- ===================================================================================== -->
    <!-- Empty Search Message -->
    <!-- ===================================================================================== -->
    <app-user-msg-block
      v-if="showEmptySearch"
      :message="emptySearchMes"
      :is-alert="false"
      class="mt-5"
    />

    <!-- ===================================================================================== -->
    <!-- Networks -->
    <!-- ===================================================================================== -->
    <v-radio-group
      v-model="networkSelected"
      :class="networks.length > 10 ? 'network-container' : ''"
    >
      <v-container
        v-for="(network, i) in networks"
        :key="network.name"
        :class="[
          { 'network-border-first': i === 0 },
          { 'network-border-last': i + 1 === networks.length },
          'py-4 px-5 network-border'
        ]"
      >
        <v-row class="pa-0 mew-body align-center justify-start">
          <!-- ===================================================================================== -->
          <!-- Icon -->
          <!-- ===================================================================================== -->
          <mew-token-container :img="network.icon" size="24px" />
          <!-- ===================================================================================== -->
          <!-- Symbol/Name -->
          <!-- ===================================================================================== -->
          <div class="textDark--text Capitalize pl-3">
            {{ network.name }}
          </div>
          <div class="px-2 textLight--text">-</div>
          <div class="textLight--text">
            ChainID: {{ network.chainId }}
          </div>
          <v-spacer />

          <!-- ===================================================================================== -->
          <!-- Radio -->
          <!-- ===================================================================================== -->
          <v-radio
            :value="network.name"
            :class="['py-2 mb-0']"
            :disabled="networkLoading"
          >
          </v-radio>
        </v-row>
      </v-container>
    </v-radio-group>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { debounce } from 'lodash';

import { chainMap, ETH, BSC, MATIC } from '@/utils/networks';
import { Toast, SUCCESS, ERROR } from '@/modules/toast/handler/handlerToast';

import handlerAnalytics from '@/modules/analytics-opt-in/handlers/handlerAnalytics.mixin';
import WALLET_TYPES from '@/modules/access-wallet/common/walletTypes';

export default {
  name: 'NetworkSwitch',
  mixins: [handlerAnalytics],
  props: {
    isWallet: { type: Boolean, default: true },
    /** Set this prop to pass specific networks to be displayed */
    filterTypes: { type: Array, default: () => [] },
    /** Set this prop to false if device does not support networks */
    hasNetworks: { type: Boolean, default: true }
  },
  data() {
    return {
      networkSelectedBefore: null,
      networkSelected: null,
      nodes: chainMap,
      toggleType: 0,
      searchInput: '',
      networkLoading: false,
      chainNameMap: {},
      chainNameList: []
    };
  },
  computed: {
    ...mapGetters('global', ['network']),
    ...mapState('global', ['validNetwork']),
    ...mapState('external', ['selectedEIP6963Provider']),
    ...mapState('wallet', ['identifier', 'instance', 'isOfflineApp']),
    /**
     * Property returns sorted network names alphabetically in this order: ETH, main and then test networks
     * @returns {string[]}
     */
    typeNames() {
      if (this.hasNetworks) {
        const unsorted =
          this.filterTypes.length > 0
            ? [...this.filterTypes]
            : this.chainNameList;

        unsorted.sort();
        const ethChain = 'Ethereum Mainnet';
        if (unsorted.indexOf(ethChain) !== -1) {
          unsorted.splice(unsorted.indexOf(ethChain), 1);
          unsorted.unshift(ethChain);
        }

        const unknownName = 'unknown';
        const test = unsorted.filter(item => {
          return chainMap[this.chainNameMap[item]].isTestNetwork;
        });
        const testWithLogo = test.filter(item => {
          return !(chainMap[this.chainNameMap[item]].logoURI.includes(unknownName));
        });
        const testWithoutLogo = test.filter(item => {
          return (chainMap[this.chainNameMap[item]].logoURI.includes(unknownName));
        });
        const testList = testWithLogo.concat(testWithoutLogo);

        const main = unsorted.filter(item => {
          return !chainMap[this.chainNameMap[item]].isTestNetwork;
        });
        const mainWithLogo = main.filter(item => {
          return !(chainMap[this.chainNameMap[item]].logoURI.includes(unknownName));
        });
        const mainWithoutLogo = main.filter(item => {
          return (chainMap[this.chainNameMap[item]].logoURI.includes(unknownName));
        });
        const mainList = mainWithLogo.concat(mainWithoutLogo);

        const sorted = mainList.concat(testList);
        return sorted;
      }
      return [];
    },
    /**
     * Property returns filter networks list based on search input and toggle  type
     * @returns {object[]}
     */
    networks() {
      let allNetworks = [];
      this.typeNames.forEach(item => {
        allNetworks.push(chainMap[this.chainNameMap[item]]);
      });
      if (this.identifier === WALLET_TYPES.MEW_WALLET) {
        allNetworks = allNetworks.filter(
          item =>
            item.name === ETH.name ||
            item.name === BSC.name ||
            item.name === MATIC.name
        );
      }
      if (this.searchInput && this.searchInput !== '') {
        return allNetworks.filter(item =>
          this.hasString(item.name, item.name_long)
        );
      }
      if (this.toggleType === 0) {
        return allNetworks.filter(item => !item.isTestNetwork);
      }
      if (this.toggleType === 1) {
        return allNetworks.filter(item => item.isTestNetwork);
      }
      return allNetworks;
    },
    /**
     * Property shows invalid search if user included input and networks length is 0
     * @returns {boolean}
     */
    showEmptySearch() {
      return (
        this.searchInput &&
        this.searchInput !== '' &&
        this.networks.length === 0
      );
    },
    /**
     * Property shows search input string
     * @returns {object}
     */
    emptySearchMes() {
      if (this.typeNames.length === 0) {
        return {
          title: 'Changing a network is not supported on your device',
          subtitle: ''
        };
      }
      return {
        title: '',
        subtitle: 'We do not have a network with this name.'
      };
    }
  },
  watch: {
    network: {
      handler: function (newVal, oldVal) {
        if (newVal.chainId !== oldVal.chainId) {
          this.networkSelected = newVal.chainId
        }
      },
      deep: true
    },
    networkSelected(value) {
      if (!!value && (value !== this.network.chainId || !this.validNetwork)) {
        this.networkLoading = true;
        this.setNetworkDebounced(value);
      }
    },
    searchInput(newVal, oldVal) {
      /**
       * Set current network to prevent undefined networkSelected value
       */
      if (this.networks.length > 0) {
        this.networkSelected = this.networkSelectedBefore;
      }

      if (newVal != oldVal && (!oldVal || oldVal === '')) {
        this.toggleType = 2;
      }
    },
    validNetwork(val) {
      this.networkSelected = val ? this.network.chainId : null;
    },
    /**
     * Set networkSelected on toggle change, if network is in the list
     */
    toggleType() {
      if (!this.networkSelected) {
        if (
          this.networks.filter(item => item.chainId === this.network.chainId)
            .length > 0
        ) {
          this.networkSelected = this.validNetwork
            ? this.network.chainId
            : 0;
        }
      }
    }
  },
  mounted() {
    Object.keys(chainMap).forEach(key => {
      const c = chainMap[key];
      this.chainNameList.push(c.name);
      this.chainNameMap[c.name] = c.chainId;
    });

    this.networkSelected = this.validNetwork ? this.network.chainId: 0;
    this.networkSelectedBefore = this.networkSelected;
  },
  methods: {
    ...mapActions('wallet', ['setWeb3Instance']),
    ...mapActions('global', ['setNetwork', 'setValidNetwork']),
    ...mapActions('external', ['setTokenAndEthBalance']),
    /**
     * Method checks whether symbol or name has searchInput substring
     * @returns {boolean}
     */
    hasString(symbol, name) {
      return (
        symbol.toLowerCase().includes(this.searchInput.toLowerCase()) ||
        name.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },
    /**
     * Method sets SearchInout on mew-search input event
     * @returns {boolean}
     */
    setSearch(newVal) {
      this.searchInput = newVal;
    },
    /**
     * Debounce network switch from user input
     * @return {void}
     */
    setNetworkDebounced: debounce(function (value) {
      this.savePreviousNetwork();
      const chainId = this.chainNameMap[value];
      const found = this.nodes[chainId];

      this.setValidNetwork(true);
      this.setNetwork({
        network: found,
        walletType: this.instance?.identifier || ''
      })
        .then(() => {
          if (this.isWallet) {
            this.networkSelected = this.validNetwork
              ? this.network.chainId
              : 0;
            this.networkLoading = false;
            const setNetworkCall =
              this.identifier === WALLET_TYPES.WEB3_WALLET
                ? this.setWeb3Instance(this.selectedEIP6963Provider)
                : this.setWeb3Instance();
            setNetworkCall.then(() => {
              Toast(`Switched network to: ${found.name}`, {}, SUCCESS);
              this.setTokenAndEthBalance();
              this.$emit('newNetwork');
            });
          }
        })
        .catch(e => {
          this.setValidNetwork(false);
          this.networkSelected = this.validNetwork
            ? this.network.chainId
            : 0;
          this.networkLoading = false;
          Toast(e, {}, ERROR);
        });
    }, 1000),
    /**
     * Backup current network value
     */
    savePreviousNetwork() {
      if (this.networkSelected) {
        this.networkSelectedBefore = this.networkSelected;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$borderNetwork: 1px solid #ececec;

.network-container {
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.network-border {
  border-bottom: $borderNetwork;
  border-right: $borderNetwork;
  border-left: $borderNetwork;
}

.network-border-first {
  border-top: $borderNetwork;
  border-radius: 4px 4px 0px 0px;
}

.network-border-last {
  border-radius: 0px 0px 4px 4px;
}

.mint-me-color {
  filter: brightness(0) saturate(100%) invert(90%) sepia(3%) saturate(5171%)
    hue-rotate(348deg) brightness(92%) contrast(63%);
}
</style>
