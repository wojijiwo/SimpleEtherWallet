<template>
  <div>
    <the-default-header @openMobileMenu="handleOpen" />
    <v-main class="js-body">
      <!-- <new-look-banner /> -->
      <router-view />
    </v-main>
    <the-default-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TheDefaultView',
  components: {
    TheDefaultHeader: () => import('./components-default/TheDefaultHeader'),
    // NewLookBanner: () => import('./components-default/NewLookBanner'),
    TheDefaultFooter: () => import('./components-default/TheDefaultFooter')
  },
  data() {
    return {
      mobileOpen: false
    };
  },
  computed: {
    ...mapState('wallet', ['isOfflineApp'])
  },
  methods: {
    handleOpen() {
      this.mobileOpen = true;
    }
    // ,
    // handleClose() {
    //   this.mobileOpen = false;
    // }
  }
};
</script>
