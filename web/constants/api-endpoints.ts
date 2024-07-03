//AUTH
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

//CATEGORIES
export const CATEGORIES = {
  CREATE: '/categories',
  GET: '/categories',
  BULK_DELETE: '/categories/delete',
  SINGLE_GET: (id: number) => `/categories/${id}`,
  UPDATE: (id: number) => `/categories/${id}`,
  DELETE: (id: number) => `/categories/${id}`,
};

//TRANSACTION
export const TRANSACTIONS = {
  CREATE: '/transactions',
  GET: '/transactions',
};
