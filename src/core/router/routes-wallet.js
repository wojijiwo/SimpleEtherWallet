import { ROUTES_WALLET } from '../configs/configRoutes';
export default {
  path: '/wallet',
  component: () => import('@/views/TheWalletView'),
  props: true,
  children: [
    {
      path: ROUTES_WALLET.WALLETS.PATH,
      name: ROUTES_WALLET.WALLETS.NAME,
      component: () => import('@/views/layouts-wallet/TheDashboardLayout'),
      meta: {
        noAuth: false,
        title: 'Crypto Portfolio Manager | ETWallet',
        description:
          'Manage your crypto portfolio with ETWallet. View all your crypto assets in one easy to use portfolio manager.'
      }
    },
    {
      path: ROUTES_WALLET.DASHBOARD.PATH,
      name: ROUTES_WALLET.DASHBOARD.NAME,
      component: () => import('@/views/layouts-wallet/TheDashboardLayout'),
      meta: {
        noAuth: false,
        title: 'Crypto Portfolio Manager | ETWallet',
        description:
          'Manage your crypto portfolio with ETWallet. View all your crypto assets in one easy to use portfolio manager.'
      }
    },
    {
      path: ROUTES_WALLET.SETTINGS.PATH,
      name: ROUTES_WALLET.SETTINGS.NAME,
      component: () => import('@/modules/settings/ModuleSettings'),
      meta: {
        noAuth: false,
        title: 'Modify Your Settings | ETWallet',
        description:
          'Manage your settings on ETWallet. We heard you like dark mode crypto apps.'
      }
    },
    {
      path: ROUTES_WALLET.PRINT.PATH,
      name: ROUTES_WALLET.PRINT.NAME,
      component: () => import('@/modules/balance/ModulePaperWallet'),
      meta: {
        noAuth: false
      }
    },
    {
      path: ROUTES_WALLET.SEND_TX.PATH,
      name: ROUTES_WALLET.SEND_TX.NAME,
      component: () =>
        import('@/views/layouts-wallet/TheSendTransactionLayout'),
      props: true,
      meta: {
        noAuth: false,
        title: 'Send And Receive Crypto | ETWallet',
        description:
          'Send and receive crypto to your self custody wallet using ETWallet. Open sourced, safe and secure EVM wallet.'
      }
    },
    {
      path: ROUTES_WALLET.DEPLOY_CONTRACT.PATH,
      name: ROUTES_WALLET.DEPLOY_CONTRACT.NAME,
      component: () => import('@/views/layouts-wallet/TheDeployContractLayout'),
      meta: {
        noAuth: false,
        title: 'Deploy Ethereum Contract On ETWallet',
        description:
          'Deploy a smart contract to the Ethereum mainnet using ETWallet. Trusted by Ethereum developers since 2015. '
      }
    },
    {
      path: ROUTES_WALLET.INTERACT_WITH_CONTRACT.PATH,
      name: ROUTES_WALLET.INTERACT_WITH_CONTRACT.NAME,
      component: () =>
        import('@/views/layouts-wallet/TheInteractContractLayout'),
      meta: {
        noAuth: false,
        title: 'Interact With Ethereum Contracts On ETWallet',
        description:
          'ETWallet empowers users to interact with Ethereum contracts directly. Collect airdrops, mint tokens and more.'
      }
    },
    {
      path: ROUTES_WALLET.SIGN_MESSAGE.PATH,
      name: ROUTES_WALLET.SIGN_MESSAGE.NAME,
      component: () => import('@/views/layouts-wallet/TheSignMessageLayout'),
      meta: {
        noAuth: false,
        title: 'Use Your Wallet To Sign a Message | ETWallet',
        description:
          'Sign a message with your crypto wallet. Use ETWallet to easily verify ownership of your wallet.'
      }
    },
    {
      path: ROUTES_WALLET.VERIFY_MESSAGE.PATH,
      name: ROUTES_WALLET.VERIFY_MESSAGE.NAME,
      component: () => import('@/views/layouts-wallet/TheVerifyMessageLayout'),
      meta: {
        noAuth: false,
        title: 'Verify A Signed Message With a Crypto Wallet | ETWallet',
        description:
          'Confirm a signed message with your crypto wallet. Access this feature using ETWallet.'
      }
    }
  ]
};
