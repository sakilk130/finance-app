import type { Metadata } from 'next';

import { Form } from './_components';

export const metadata: Metadata = {
  title: 'Sign In - Finance',
  description: 'Sign in to get started with Finance',
};

const SignInPage = () => {
  return <Form />;
};

export default SignInPage;
