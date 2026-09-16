import React from 'react';
import { Metadata } from 'next';
import SuccessClientPage from './SuccessClientPage';

export const metadata: Metadata = {
  title: 'Account Opening Successful | Lumo Group Bank',
  description: 'Your Lumo Group Bank account vault has been successfully created. View your account details and proceed to your dashboard.',
};

export default function RegisterSuccessPage() {
  return <SuccessClientPage />;
}
