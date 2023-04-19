import { TAB_QUERY_PARAM } from 'shared/components/Tabs';

import { BILLING_TAB } from './tabs';

export default {
  NOT_FOUND: '/404',
  ABOUT_YOURSELF: '/about-yourself',
  CAREERS: '/careers',
  CHECKOUT: '/checkout',
  CHECKOUT_CONFIRMED: '/checkout/confirmed',
  CHECKOUT_MEMBERSHIP_CONFIRMED: '/checkout/membership',
  CONTENT: '/content',
  DASHBOARD: '/dashboard',
  FAQ: '/faq',
  FIRSTSESSIONRESERVED: '/first-session/reserved',
  FORGOTPASSWORD: '/forgotpassword',
  FORGOTPASSWORDSUCCESS: '/forgotpassword/success',
  GALLERY: '/gallery',
  GOALS: '/goals',
  HOME: '/',
  WHY_JOIN: '/why-join',
  LOCATIONS: '/locations',
  LOCATIONSFIRST: '/locations-first',
  LOGIN: '/login',
  MANAGE_MEMBERSHIP: '/manage-membership',
  MEMBERSHIPS: '/memberships',
  MYACCOUNT: '/my-account',
  OPEN_CLUB_SESSION: '/session/:id/:date/open-club',
  SKLZ_SESSION: '/session/:id/:date/sklz',
  PAYMENT_METHODS: '/payment-methods',
  PAYMENT_METHODS_ADD: '/payment-methods/add',
  PAYMENT_METHODS_SELECT: '/payment-methods/select',
  PRIVACY_POLICY: '/privacy-policy',
  PAYMENT_HISTORY: '/payment-history',
  PWA: '/app',
  RATING: '/rating',
  REFERRALS: '/my-account/referrals',
  RESETPASSWORD: '/resetpassword',
  RESETPASSWORDSUCCESS: '/resetpassword/success',
  RULES: '/rules',
  SESSION: '/session/:id/:date',
  SESSIONCONFIRMED: '/session/confirmed',
  SESSIONRESERVED: '/session/reserved',
  SETTINGS: '/settings',
  BILLING: `/settings?${TAB_QUERY_PARAM}=${BILLING_TAB}`,
  SIGNUP: '/signup',
  SIGNUPCONFIRMATION: '/signup/confirmation',
  SIGNUPSUCCESS: '/signup/success',
  TERMS: '/terms-and-conditions',
};
