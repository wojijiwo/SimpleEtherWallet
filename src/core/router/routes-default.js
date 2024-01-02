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
        title: 'MyEtherWallet | The Best Crypto Wallet For Web3',
        description:
          'Trusted by millions of users, MyEtherWallet is the first and best open source Ethereum wallet. Create a secure crypto wallet, buy, sell, stake and swap.'
      }
    },
    {
      path: ROUTES_HOME.SECURITY_POLICY.PATH,
      name: ROUTES_HOME.SECURITY_POLICY.NAME,
      component: () =>
        import('@/views/layouts-default/TheSecurityPolicyLayout'),
      meta: {
        noAuth: true,
        title: 'MyEtherWallet Security Policy | MyEtherWallet Bug Bounty',
        desription:
          'MyEtherWallet is devoted to keeping crypto users secure. Learn about the security and bug bounty for MyEtherWallet.'
      }
    },
    {
      path: ROUTES_HOME.PRIVACY_POLICY.PATH,
      name: ROUTES_HOME.PRIVACY_POLICY.NAME,
      component: () => import('@/views/layouts-default/ThePrivacyPolicyLayout'),
      meta: {
        noAuth: true,
        title: 'MyEtherWallet Privacy Policy | Privacy First Crypto Wallet',
        description:
          "MyEtherWallet's privacy policy. Learn how MyEtherWallet protects your privacy."
      }
    },
    {
      path: ROUTES_HOME.TERMS_OF_SERVICE.PATH,
      name: ROUTES_HOME.TERMS_OF_SERVICE.NAME,
      component: () =>
        import('@/views/layouts-default/TheTermsOfServiceLayout'),
      meta: {
        noAuth: true,
        title: 'MyEtherWallet Terms of Service',
        description:
          'Read the Terms of Service for MyEtherWallet. A privacy first, open source crypto wallet. '
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
          'Create a secure self custody crypto wallet using MyEtherWallet. Choose from our mobile app or browser extension wallet.'
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
        title: 'Access Your Crypto Wallet on MyEtherWallet',
        description:
          'Use a web3 browser extension, hardware wallet or a mobile app to access your crypto wallet. Manage your NFTs and crypto all in one place!'
      },
      beforeEnter: accessRouteGuard
    }
  ]
};
