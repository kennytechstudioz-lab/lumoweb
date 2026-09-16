import React from 'react';
import { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';

export const metadata: Metadata = {
  title: 'Reset Password | Lumo Group Bank',
  description: 'Reset your Lumo Group Bank password securely. Request vault clearance instructions via registered email.',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
