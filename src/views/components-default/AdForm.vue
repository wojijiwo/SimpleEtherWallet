<template>
  <div class="px-3 pt-16">
    <v-row class="ad-form-component">
      <img
        src="@/assets/images/backgrounds/wave.png"
        width="100%"
        class="ad-img d-md-inline"
      />
      <v-col col="12" class="ad-form-container pb-15">
        <v-row>
          <v-col cols="12" md="6" class="d-flex justify-center justify-md-end">
            <img
              src="@/assets/images/backgrounds/mew-spaceman.png"
              alt="mew spaceman"
              class="ad-form-img"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="4"
            class="d-flex flex-column justify-center align-start"
          >
            <div
              :class="[
                $vuetify.breakpoint.mdAndDown ? 'mew-subtitle' : 'mew-title',
                'font-weight-regular text-center pb-5 talk-to-marketing-title title-anchor-ad-mew'
              ]"
            >
              Let's talk about your <br />
              marketing goals
            </div>
            <div
              style="width: 278px"
              class="text-center pb-5 talk-to-marketing-caption"
            >
              Request the full catalog and pricing of all <br />
              advertising positions.
            </div>
            <mew-button
              btn-style="background"
              color-theme="primary"
              btn-size="xlarge"
              title="CONTACT ADVERTISING TEAM"
              class="margin-0-auto"
              btn-link="mailto:@info@myetherwallet.com"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.margin-0-auto {
  margin: 0 auto !important;
}
.ad-form-container {
  background-color: #b9e5df;

  .ad-form-img {
    width: 100%;
    max-width: 350px;
  }
}

.talk-to-marketing-title {
  @extend .margin-0-auto;
  color: #184f90;
  line-height: 51.5px;
  letter-spacing: 0.508px;
}
.talk-to-marketing-caption {
  @extend .margin-0-auto;
  color: #184f90;
  line-height: 20px;
  letter-spacing: 0.3px;
  font-size: 12px;
}
</style>
