import { ROUTES_HOME } from '../configs/configRoutes';
import {
  createWalletProps,
  createRouteGuard,
  accessWalletProps,
  accessRouteGuard
} from './helpers';

export default {
  path: '/',
  component: () => import('@/views/TheDefaultView'),
  props: true,
  children: [
    {
      path: ROUTES_HOME.HOME.PATH,
      name: ROUTES_HOME.HOME.NAME,
      component: () => import('@/views/layouts-default/TheHomeLayout'),
      meta: {
        noAuth: true,
        title: 'ETWallet | The Best Crypto Wallet For Web3',
        description:
          'Trusted by millions of users, ETWallet is the first and best open source Ethereum wallet. Create a secure crypto wallet, buy, sell, stake and swap.'
      }
    },
    {
      path: ROUTES_HOME.SECURITY_POLICY.PATH,
      name: ROUTES_HOME.SECURITY_POLICY.NAME,
      component: () =>
        import('@/views/layouts-default/TheSecurityPolicyLayout'),
      meta: {
        noAuth: true,
        title: 'ETWallet Security Policy | ETWallet Bug Bounty',
        desription:
          'ETWallet is devoted to keeping crypto users secure. Learn about the security and bug bounty for ETWallet.'
      }
    },
    {
      path: ROUTES_HOME.PRIVACY_POLICY.PATH,
      name: ROUTES_HOME.PRIVACY_POLICY.NAME,
      component: () => import('@/views/layouts-default/ThePrivacyPolicyLayout'),
      meta: {
        noAuth: true,
        title: 'ETWallet Privacy Policy | Privacy First Crypto Wallet',
        description:
          "ETWallet's privacy policy. Learn how ETWallet protects your privacy."
      }
    },
    {
      path: ROUTES_HOME.TERMS_OF_SERVICE.PATH,
      name: ROUTES_HOME.TERMS_OF_SERVICE.NAME,
      component: () =>
        import('@/views/layouts-default/TheTermsOfServiceLayout'),
      meta: {
        noAuth: true,
        title: 'ETWallet Terms of Service',
        description:
          'Read the Terms of Service for ETWallet. A privacy first, open source crypto wallet. '
      }
    },
    {
      path: ROUTES_HOME.CREATE_WALLET.PATH,
      name: ROUTES_HOME.CREATE_WALLET.NAME,
      component: () => import('@/views/layouts-default/TheCreateWalletLayout'),
      props: createWalletProps,
      meta: {
        noAuth: true,
        title: 'Create A Crypto Wallet | Mobile and Browser Crypto Wallets',
        description:
          'Create a secure self custody crypto wallet using ETWallet. Choose from our mobile app or browser extension wallet.'
      },
      beforeEnter: createRouteGuard
    },
    {
      path: ROUTES_HOME.ACCESS_WALLET.PATH,
      name: ROUTES_HOME.ACCESS_WALLET.NAME,
      component: () => import('@/views/layouts-default/TheAccessWalletLayout'),
      props: accessWalletProps,
      meta: {
        noAuth: true,
        title: 'Access Your Crypto Wallet on ETWallet',
        description:
          'Use a web3 browser extension, hardware wallet or a mobile app to access your crypto wallet. Manage your NFTs and crypto all in one place!'
      },
      beforeEnter: accessRouteGuard
    }
  ]
};
