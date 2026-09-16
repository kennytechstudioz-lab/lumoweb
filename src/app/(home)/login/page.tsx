import React from 'react';
import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Secure Account Sign In | Lumo Group Bank',
  description: 'Log in to your secure Lumo Group Bank digital banking account to manage multi-currency balances, international wire transfers, and account cards.',
  openGraph: {
    title: 'Secure Account Sign In | Lumo Group Bank',
    description: 'Log in to your secure Lumo Group Bank digital banking account to manage multi-currency balances, international wire transfers, and account cards.',
    type: 'website',
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
