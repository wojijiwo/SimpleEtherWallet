const ROUTES_HOME = {
  HOME: { NAME: 'Home', PATH: '' },
  //A-Z
  ACCESS_WALLET: { NAME: 'AccessWallet', PATH: 'wallet/access/:overlay?' },
  CREATE_WALLET: { NAME: 'CreateWallet', PATH: 'wallet/create/:overlay?' },
  PAGE_NOT_FOUND: { NAME: 'PageNotFound', PATH: '*' },
  PRIVACY_POLICY: { NAME: 'PrivacyPolicy', PATH: 'privacy-policy' },
  SECURITY_POLICY: { NAME: 'SecurityPolicy', PATH: 'security-policy' },
  TERMS_OF_SERVICE: { NAME: 'TermsOfService', PATH: 'terms-of-service' }
};
const ROUTES_WALLET = {
  WALLETS: { NAME: 'Wallets', PATH: '' },
  //A-Z
  DASHBOARD: { NAME: 'Dashboard', PATH: 'dashboard' },
  DEPLOY_CONTRACT: { NAME: 'DeployContract', PATH: 'deploy' },
  INTERACT_WITH_CONTRACT: { NAME: 'InteractWithContract', PATH: 'interact' },
  NFT_MANAGER: { NAME: 'NFTManager', PATH: 'nft' },
  NFT_MANAGER_SEND: { NAME: 'NftManagerSend', PATH: 'send-your-nft' },
  PRINT: { NAME: 'PrintPaperWallet', PATH: 'print-wallet' },
  SEND_TX: { NAME: 'SendTX', PATH: 'send-tx' },
  SEND_TX_OFFLINE: { NAME: 'SendTXOffline', PATH: 'send-tx-offline' },
  SETTINGS: { NAME: 'Settings', PATH: 'settings' },
  SIGN_MESSAGE: { NAME: 'SignMessage', PATH: 'sign' },
  VERIFY_MESSAGE: { NAME: 'VerifyMessage', PATH: 'verify' }
};

export { ROUTES_HOME, ROUTES_WALLET };
