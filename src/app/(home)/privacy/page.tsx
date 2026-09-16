import React from 'react';
import { Metadata } from 'next';
import PrivacyClientPage from './PrivacyClientPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Lumo Group Bank',
  description: 'Learn how Lumo Group Bank safeguards your personal information, financial data, and account details with high-level encryption and strict privacy policies.',
  openGraph: {
    title: 'Privacy Policy | Lumo Group Bank',
    description: 'Learn how Lumo Group Bank safeguards your personal information, financial data, and account details with high-level encryption and strict privacy policies.',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return <PrivacyClientPage />;
}
