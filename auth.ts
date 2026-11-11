import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import {
  findByEmail,
  createUser,
  findGoogleAccount,
  findUserById,
  createUserAccount,
} from "@/app/models/user.model";
import bcrypt from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //verifying user credentials is correct or not
      async authorize(credentials) {
        const { email, password } = credentials;

        if (
          typeof email !== "string" ||
          typeof password !== "string" ||
          !email ||
          !password
        ) {
          //login reject
          return null;
        }

        const rows: any = await findByEmail(email.trim().toLowerCase());
        const user = rows[0];

        if (!user || !user.user_password || user.is_active === false)
          return null;

        const isMatch = await bcrypt.compare(password, user.user_password);

        if (!isMatch) return null;
        //sending for token & session
        return {
          id: String(user.id),
          name: user.user_name,
          email: user.user_email,
          role: user.role,
        };
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    //user -> authneticated user info
    //account -> Provider information (google/credentials)
    //profile -> google received data

    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") {
        return true;
      }

      try {
        if (account?.provider === "google") {
          const email = user.email?.trim().toLowerCase();
          const googleId = account.providerAccountId;

          if (!email || !googleId) return false;

          // Verify Google email
          if (!profile || (profile as any).email_verified !== true) {
            return false;
          }

          // 1. Check existing Google account
          let dbUser = await findGoogleAccount("GOOGLE", googleId);

          if (dbUser) {
            if (!dbUser.is_active) return false;

            user.id = String(dbUser.id);
            user.role = dbUser.role;

            return true;
          }

          // 2. Check existing email account
          const rows: any = await findByEmail(email);
          dbUser = rows[0];

          // 3. Create new user if not registered
          if (!dbUser) {
            const result: any = await createUser(
              user.name || "Google User",
              email,
              null
            );

            dbUser = await findUserById(result.insertId);
          }

          if (!dbUser || !dbUser.is_active) return false;

          // 4. Link Google account
          const linkResult: any = await createUserAccount({
            userId: dbUser.id,
            provider: "GOOGLE",
            providerAccountId: googleId,
            access_token: account.access_token,
          });

          if (linkResult.affectedRows !== 1) return false;

          // 5. Set MySQL user ID
          user.id = String(dbUser.id);
          user.role = dbUser.role;

          return true;
        }
      } catch (err) {
        console.error("Google sign-in error:", err);
      }

      return false;
    },


    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 10 * 60 * 60,
  },

  secret: process.env.AUTH_SECRET || process.env.JWT_SECRET_KEY,
});
