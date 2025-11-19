export const PAGE = {
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  CHECK_OTP: '/check-otp',
  VERIFY_ACCOUNT: '/verify-account',
  REGISTER: '/register',

  OVERVIEW: '/overview',
  ACCOUNT: '/account',
  DEVICE: '/device',
  PROVIDER_CONTENT: '/provider-content',
  PROVIDER_DEVICE: '/provider-device',
  SONG: '/song',
  PARTNER_LICENSE: '/partner-license',
  MERCHANT: '/merchant',
  MERCHANT_BRANCH: '/merchant-branch',
  ROLE: '/role',
  ROLE_LIST: '/role/list',
  PERMISSION: '/role/permission',
  TRANSACTION: '/transaction',

  WIDGET: '/widget',
  DOCS: '/docs',

  USER: '/asd',
} as const;

export const PUBLIC_ROUTERS = {
  LOGIN: PAGE.LOGIN,
  FORGOT_PASSWORD: PAGE.FORGOT_PASSWORD,
  CHECK_OTP: PAGE.CHECK_OTP,
  VERIFY_ACCOUNT: PAGE.VERIFY_ACCOUNT,
  REGISTER: PAGE.REGISTER,
} as const;

export const PRIVATE_ROUTERS = {
  BASE: '/',

  BUSINESS: {
    BASE: '/',
    ACCOUNT: PAGE.ACCOUNT,
    OVERVIEW: PAGE.OVERVIEW,  
    DEVICE: PAGE.DEVICE, 
    PROVIDER_CONTENT: PAGE.PROVIDER_CONTENT, 
    PROVIDER_DEVICE: PAGE.PROVIDER_DEVICE, 
    SONG: PAGE.SONG, 
    PARTNER_LICENSE: PAGE.PARTNER_LICENSE, 
    MERCHANT: PAGE.MERCHANT, 
    MERCHANT_BRANCH: PAGE.MERCHANT_BRANCH, 
    ROLE: PAGE.ROLE,
    TRANSACTION: PAGE.TRANSACTION,
    WIDGET: {
      INDEX: PAGE.WIDGET,
      DOCS: PAGE.WIDGET + PAGE.DOCS,
    },

    USER: PAGE.USER,
    
  },
} as const;
