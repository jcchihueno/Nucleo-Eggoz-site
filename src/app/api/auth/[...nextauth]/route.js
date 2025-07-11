import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../lib/mongodb';
import User from '../lib/models/User';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            throw new Error('Nenhum usuário encontrado com este email');
          }
          
          // Check password
          const isPasswordValid = await user.comparePassword(credentials.password);
          
          if (!isPasswordValid) {
            throw new Error('Senha incorreta');
          }
          
          // Return user object
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error(error.message || 'Falha na autenticação');
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin',
    error: '/admin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET || 'nucleo-eggoz-default-secret',
});

export { handler as GET, handler as POST };