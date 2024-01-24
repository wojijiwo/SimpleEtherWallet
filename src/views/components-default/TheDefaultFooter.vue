<template>
  <div class="mew-component--home-footer textDark--text">
    <div class="desktop-content d-none d-lg-block">
      <v-container class="pt-12 pb-6">
        <div class="d-flex align-center justify-space-between mt-12">
          <div class="d-flex align-center mx-n6">
            <div class="d-flex align-center line-height-small">
              <div class="px-6 border-right">
                <a
                  class="color--inherit"
                  href="mailto:contact@etwallet.xyz"
                  rel="noopener noreferrer"
                  target="_blank"
                  @click="trackFooterLink({ label: 'feedback' })"
                >
                  {{ $t('footer.feedback') }}
                </a>
              </div>
              <div class="px-6 border-right">
                <router-link
                  :to="{ name: ROUTES_HOME.PRIVACY_POLICY.NAME }"
                  @click="
                    trackFooterLink({ label: ROUTES_HOME.PRIVACY_POLICY.NAME })
                  "
                >
                  {{ $t('footer.privacy') }}
                </router-link>
              </div>
              <div class="px-6 border-right">
                <router-link
                  :to="{ name: ROUTES_HOME.TERMS_OF_SERVICE.NAME }"
                  @click="
                    trackFooterLink({
                      label: ROUTES_HOME.TERMS_OF_SERVICE.NAME
                    })
                  "
                >
                  {{ $t('footer.tos') }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="matomo-tracking-switch">
            <v-switch
              :input-value="consentToTrack"
              inset
              :label="`Data Tracking ${consentToTrack ? 'On' : 'Off'}`"
              color="greenPrimary"
              off-icon="mdi-alert-circle"
              @change="setConsent"
            />
          </div>
          <div class="social-icons d-flex align-center">
            <a
              v-for="(i, key) in socialIcons"
              :key="key"
              :href="i.link"
              target="_blank"
              rel="noopener noreferrer"
              class="ml-4"
              @click="trackFooterLink({ label: i.icon })"
            >
              <mew-icon v-if="i.icon" :img-height="20" :icon-name="i.icon" />
              <img
                v-if="i.iconImage"
                :src="i.iconImage"
                alt="Social"
                height="15"
              />
            </a>
          </div>
        </div>
      </v-container>
      <v-sheet color="textDark" class="py-2">
        <v-container>
          <div class="d-flex align-center">
            <a
              :href="`https://github.com/ETWallet/ETWallet/releases/tag/v${version}`"
              target="_blank"
              class="cyan--text text--lighten-3 ma-0"
              rel="noopener noreferrer"
              @click="trackFooterLink({ label: 'github_version' })"
              >v{{ version }}</a
            >
            <v-spacer />
            <p class="teal--text text--lighten-1 ma-0">
              {{ $t('footer.copyright', { year: new Date().getFullYear() }) }}
              <a
                class="cyan--text text--lighten-3"
                href="https://www.coingecko.com/en"
                target="_blank"
                rel="noopener noreferrer"
                @click="trackFooterLink({ label: 'coingecko' })"
                >{{ $t('footer.coingecko') }}</a
              >.
            </p>
            <v-spacer />
            <v-sheet width="150" color="transparent">
              <v-select
                v-model="select"
                append-icon="mdi-chevron-down"
                :items="languages"
                item-text="name"
                item-value="value"
                return-object
                single-line
                dark
              ></v-select>
            </v-sheet>
          </div>
        </v-container>
      </v-sheet>
    </div>

    <div class="mobile-content d-block d-lg-none">
      <v-container class="py-12">
        <v-sheet color="transparent" max-width="500px" class="mx-auto">
          <div>
            <h3 class="mb-3 d-flex align-center">
              {{ $t('footer.donation.heading') }}
            </h3>
            <p>{{ $t('footer.donation.text') }}</p>
            <a
              class="color--inherit d-flex align-center mb-1"
              rel="noopener noreferrer"
              target="_blank"
              :href="`https://etherscan.io/address/${ethDonationAddress}`"
              @click="trackDonationAddress('ethereum')"
            >
              <mew-icon
                icon-name="eth"
                icon-type="mew"
                :img-height="35"
                class="mr-2"
              />
              <div>
                <div>{{ $t('footer.donation.ether') }}</div>
                <div v-show="false" class="overline">
                  Address: {{ ethDonationAddress }}
                </div>
              </div>
            </a>
            <a
              class="color--inherit d-flex align-center"
              rel="noopener noreferrer"
              target="_blank"
              :href="`https://blockchain.info/address/${btcDonationAddress}`"
              @click="trackDonationAddress('bitcoin')"
            >
              <mew-icon
                icon-name="btc"
                icon-type="mew"
                :img-height="35"
                class="mr-2"
              />
              <div>
                <div>{{ $t('footer.donation.bitcoin') }}</div>
                <div v-show="false" class="overline">
                  Address: {{ btcDonationAddress }}
                </div>
              </div>
            </a>
          </div>

          <div
            class="social-icons d-flex align-center flex-wrap justify-center mt-12"
          >
            <a
              v-for="(i, key) in socialIcons"
              :key="key"
              :href="i.link"
              target="_blank"
              style="height: 23px"
              rel="noopener noreferrer"
              class="px-4 my-5"
              @click="trackFooterLink({ label: i.icon })"
            >
              <mew-icon v-if="i.icon" :img-height="23" :icon-name="i.icon" />
              <img
                v-if="i.iconImage"
                :src="i.iconImage"
                alt="Social"
                height="19"
              />
            </a>
          </div>

          <div class="d-flex mt-10">
            <div class="d-flex align-center line-height-small mx-auto">
              <div class="px-4 px-lg-6 border-right">
                <a
                  class="color--inherit"
                  href="mailto:support@etwallet.xyz"
                  rel="noopener noreferrer"
                  target="_blank"
                  @click="trackFooterLink({ label: 'feedback' })"
                >
                  {{ $t('footer.feedback') }}
                </a>
              </div>
              <div class="px-4 px-lg-6 border-right">
                <router-link
                  :to="{ name: ROUTES_HOME.PRIVACY_POLICY.NAME }"
                  @click="
                    trackFooterLink({ label: ROUTES_HOME.PRIVACY_POLICY.NAME })
                  "
                >
                  Privacy
                </router-link>
              </div>
              <div class="px-4 px-lg-6 border-right">
                <router-link
                  :to="{ name: ROUTES_HOME.TERMS_OF_SERVICE.NAME }"
                  @click="
                    trackFooterLink({
                      label: ROUTES_HOME.TERMS_OF_SERVICE.NAME
                    })
                  "
                >
                  Terms
                </router-link>
              </div>
            </div>
          </div>
        </v-sheet>
      </v-container>

      <v-sheet color="textDark" class="py-9">
        <v-container>
          <v-sheet color="transparent" max-width="500px" class="mx-auto">
            <div class="d-flex align-center justify-space-between">
              <a
                :href="`https://github.com/ETWallet/ETWallet/releases/tag/v${version}`"
                rel="noopener noreferrer"
                target="_blank"
                class="cyan--text text--lighten-3 ma-0"
                @click="trackFooterLink({ label: 'github_version' })"
                >v{{ version }}</a
              >
              <v-sheet width="150" color="transparent">
                <v-select
                  v-model="select"
                  append-icon="mdi-chevron-down"
                  :items="languages"
                  item-text="name"
                  item-value="value"
                  return-object
                  single-line
                  dark
                ></v-select>
              </v-sheet>
            </div>
            <v-sheet color="transparent" max-width="300px" class="mx-auto">
              <p class="teal--text text--lighten-1 mt-6 mb-0 text-center">
                {{ $t('footer.copyright', { year: new Date().getFullYear() }) }}
                <a
                  class="cyan--text text--lighten-3"
                  href="https://www.coingecko.com/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click="trackFooterLink({ label: 'coingecko' })"
                  >{{ $t('footer.coingecko') }}</a
                >.
              </p>
            </v-sheet>
          </v-sheet>
        </v-container>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { ROUTES_HOME } from '@/core/configs/configRoutes';
import { loadLanguageAsync } from '@/main/i18n';
import handlerAnalytics from '@/modules/analytics-opt-in/handlers/handlerAnalytics.mixin';

export default {
  name: 'TheDefaultFooter',
  mixins: [handlerAnalytics],
  data: () => ({
    // eslint-disable-next-line
    ethDonationAddress: ETH_DONATION_ADDRESS,
    // eslint-disable-next-line
    btcDonationAddress: BTC_DONATION_ADDRESS,
    version: VERSION,
    select: 'en_US',
    languages: [
      {
        name: 'English',
        value: 'en_US',
        flag: require('@/assets/images/flags/uk.png')
      }
    ],
    socialIcons: [
      {
        link: 'https://twitter.com/etwalletxyz',
        icon: 'twitter'
      },
      {
        link: 'https://github.com/etwalletxyz',
        icon: 'github'
      },
      {
        link: 'https://medium.com/@etwalletxyz',
        icon: 'medium'
      },
      {
        link: 'https://t.me/etwalletxyz',
        iconImage: require('@/assets/images/icons/icon-telegram.svg')
      }
    ],
    ROUTES_HOME: ROUTES_HOME
  }),
  watch: {
    select({ value }) {
      loadLanguageAsync(value);
    }
  },
  methods: {
    trackFooterLink(d) {
      this.trackFooterAmplitude(d.label.replace(' ', '_').toLowerCase());
    },
    trackDonationAddress(val) {
      this.trackFooterAmplitude(val);
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.v-list-item {
  min-height: 35px;
}
.border-right {
  border-right: 1px solid black;
}
.line-height-small {
  > div {
    line-height: 11px;
  }
}
.v-expansion-panel-header {
  max-width: 524px;
  margin: 0 auto;
}
</style>

<style lang="scss">
.mew-component--home-footer {
  a {
    color: var(--v-textDark-base) !important;
  }
  .v-select__selection {
    color: #80deea !important;
    width: 100%;
    text-align: right;
  }

  .v-text-field > .v-input__control > .v-input__slot:before,
  .v-text-field > .v-input__control > .v-input__slot:after,
  .v-select.v-text-field input,
  .v-text-field__details {
    display: none;
  }

  .v-text-field .v-input__append-inner {
    margin-left: -15px;
  }

  .v-text-field,
  .v-input__slot {
    margin: 0;
    padding: 0;
  }
  .v-select .v-icon {
    color: #80deea !important;
  }

  .mobile-content {
    ul {
      li {
        padding: 0.8rem 0;
        user-select: none;
      }
    }

    .v-item-group {
      border-bottom: 1px solid rgb(224 224 224);
    }

    .v-expansion-panel-header {
      padding: 25px 0rem !important;
    }

    .v-sheet,
    .v-expansion-panel:before {
      box-shadow: none !important;
    }
    .v-expansion-panel-header__icon {
      position: absolute;
      right: 20px;
      top: 0;
      bottom: 0;
    }
  }
}
</style>
