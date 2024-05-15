import type { Metadata } from 'next';

import { Form } from './_components';

export const metadata: Metadata = {
  title: 'Sign Up - Finance',
  description: 'Sign up to get started with Finance',
};

const SignUpPage = () => {
  return <Form />;
};

export default SignUpPage;
