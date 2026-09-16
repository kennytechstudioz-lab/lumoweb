import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getApiUrl } from '@/util/api';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Vault Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const apiUrl = getApiUrl();
          const res = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const text = await res.text();
          let data: any = null;
          try {
            data = text ? JSON.parse(text) : null;
          } catch {
            return null;
          }

          if (!res.ok || !data?.token) {
            throw new Error(data?.message || 'Verification failed');
          }

          return {
            id: data.user.id,
            name: data.user.fullName,
            email: data.user.email,
            username: data.user.username,
            accountNumber: data.user.accountNumber,
            status: data.user.status,
            accessToken: data.token,
          } as any;
        } catch (err: any) {
          throw new Error(err.message || 'Could not verify credentials.');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET || 'accessnationalbankvaultsecret987654321',
});

export { handler as GET, handler as POST };
