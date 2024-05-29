// auth
export const AUTH = {
  SIGN_UP: '/auth/register',
  SIGN_IN: '/auth/sign-in',
};

//ACCOUNT
export const ACCOUNTS = {
  CREATE: '/accounts',
  GET: '/accounts',
  BULK_DELETE: '/accounts/delete',
  SINGLE_GET: (id: number) => `/accounts/${id}`,
  UPDATE: (id: number) => `/accounts/${id}`,
  DELETE: (id: number) => `/accounts/${id}`,
};
