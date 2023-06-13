import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const providers = [
    CredentialsProvider({
        type: 'credentials',
        name: 'Credentials',
        credentials: {
            email: {
                label: 'Email',
                type: 'email',
            },
            password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials, _req) {
            try {
                const user = await axios.post(
                    `${process.env.BACKEND_URL}/user/login`,
                    {
                        password: credentials?.password,
                        email: credentials?.email,
                    },
                );

                if (user) {
                    return user;
                }
                return null;
            } catch (err: any) {
                const errorMessage = err.response.data.message;
                throw new Error(errorMessage + '&email=' + credentials?.email);
            }
        },
    }),
];

const callbacks: any = {
    async jwt(token: { accessToken: any }, user: { data: { token: any } }) {
        if (user) {
            token.accessToken = user.data.token;
        }

        return token;
    },

    async session(session: { accessToken: any }, token: { accessToken: any }) {
        session.accessToken = token.accessToken;
        return session;
    },
};

const options: AuthOptions = {
    providers,
    callbacks,
    pages: {
        error: '/login', // Changing the error redirect page to our custom login page
    },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options);
