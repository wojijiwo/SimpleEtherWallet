<template>
  <v-app class="walletBg">
    <router-view />
    <module-toast />
    <module-global-modals />
    <module-analytics />
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';

import {
  getInjectedName,
  getInjectedIcon
} from '@/core/helpers/detectProvider.js';
import { PWA_EVENTS } from '@/core/helpers/common';
import {
  Toast,
  ERROR,
  SUCCESS,
  INFO
} from '@/modules/toast/handler/handlerToast';
import handlerAnalyticsMixin from '@/modules/analytics-opt-in/handlers/handlerAnalytics.mixin.js';

export default {
  name: 'App',
  components: {
    ModuleToast: () => import('@/modules/toast/ModuleToast.vue'),
    ModuleGlobalModals: () =>
      import('@/modules/global-modals/ModuleGlobalModals'),
    ModuleAnalytics: () => import('@/modules/analytics-opt-in/ModuleAnalytics')
  },
  mixins: [handlerAnalyticsMixin],
  computed: {
    ...mapState('custom', ['addressBook']),
    ...mapState('addressBook', ['isMigrated']),
    ...mapState('global', ['preferredCurrency']),
    ...mapState('article', ['timestamp']),
    ...mapGetters('article', ['articleList']),
    ...mapGetters('global', ['network'])
  },
  created() {
    const succMsg = this.$t('common.updates.new');
    const updateMsg = this.$t('common.updates.update-found');
    const errMsg = this.$t('common.updates.update-error');
    this.$vuetify.theme.dark = false;

    // pwa listeners
    window.addEventListener(PWA_EVENTS.PWA_UPDATED, () => {
      Toast(succMsg, {}, SUCCESS);
    });
    window.addEventListener(PWA_EVENTS.PWA_MOUNT_ERROR, () => {
      Toast(errMsg, {}, ERROR);
    });
    window.addEventListener(PWA_EVENTS.PWA_UPDATE_FOUND, () => {
      Toast(updateMsg, {}, INFO);
    });
  },
  mounted() {
    // manually add web3 wallet detected
    if (window.ethereum) {
      const name = getInjectedName(window.ethereum);
      const info = {
        rdns: 'com.detected.injectedwallet',
        uuid: uuidv4(),
        name: name,
        icon: getInjectedIcon(name)
      };
      const provider = window.ethereum;
      this.storeEIP6963Wallet({ info, provider });
    }
    // epi6963 listener
    window.addEventListener('eip6963:announceProvider', e => {
      this.storeEIP6963Wallet(e.detail);
    });
    this.footerHideIntercom();
    this.logMessage();
    this.setOnlineStatus(window.navigator.onLine);
    if (window.navigator.onLine) {
      this.setCurrency(this.preferredCurrency);
      this.updateArticles({
        timestamp: this.timestamp,
        articleList: this.articleList
      });
    }
    // Window events to watch out if the online status changes
    window.addEventListener('offline', () => {
      this.setOnlineStatus(false);
    });
    window.addEventListener('online', () => {
      this.setOnlineStatus(true);
      this.setCurrency(this.preferredCurrency);
    });
    if (!this.isMigrated) {
      // this.addressBook is the old one that resides in custom store
      this.setAddressBook(this.addressBook).then(() => {
        this.setMigrated(true);
      });
    }
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange');
    window.removeEventListener('mouseout');
    window.removeEventListener('eip6963:announceProvider');
  },
  methods: {
    ...mapActions('global', ['setOnlineStatus']),
    ...mapActions('external', ['setCurrency']),
    ...mapActions('addressBook', ['setMigrated', 'setAddressBook']),
    ...mapActions('article', ['updateArticles']),
    ...mapActions('article', ['updateArticles']),
    ...mapActions('popups', ['showSurveyPopup']),
    ...mapActions('external', ['storeEIP6963Wallet']),
    logMessage() {},
    // Hide intercom button when users reach the footer or bottom of screen
    footerHideIntercom() {
      window.onscroll = function () {
        if (!window.Intercom) return;
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100
        ) {
          window.Intercom('update', {
            hide_default_launcher: true
          });
        } else {
          window.Intercom('update', {
            hide_default_launcher: false
          });
        }
      };
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/GlobalStyles.scss';
@import '@/assets/styles/GlobalComponents.scss';
</style>
