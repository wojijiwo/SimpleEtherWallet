import VueApollo from 'vue-apollo';
import Vue from 'vue';

import { createApolloClient } from '@/core/helpers/createApolloClient';

const main = createApolloClient(
  'https://api-v2.ethvm.dev',
  'wss://apiws-v2.ethvm.dev'
);
const apolloProvider = new VueApollo({
  clients: {
    main
  },
  defaultClient: main
});
Vue.use(VueApollo);
export default apolloProvider;
