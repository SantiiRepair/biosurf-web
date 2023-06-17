import { useGoogleLogin } from '@react-oauth/google';
import Cookie from 'js-cookie';
import Router from 'next/router';
import axios from 'axios';
import { catchAxiosError } from './error';

export const COOKIES = {
    authToken: 'smsuances.session',
};

export async function SignIn(query: string): Promise<string | void> {
    useGoogleLogin({
        onSuccess: async tokenResponse => {
            const res: any = await axios
                .post(`${process.env.BACKEND_URL}/user/google?${query}`, {
                    googleToken: tokenResponse.access_token,
                })
                .catch(catchAxiosError);

            if (res.error) {
                return res.error;
            } else if (!res.data || !res.data.token) {
                return 'Something went wrong!';
            }

            if (query == 'login') {
                const { token } = res.data;
                Cookie.set(COOKIES.authToken, token);
                await Router.push('/dashboard');
            } else if (query == 'register') {
                await Router.push('/login');
            }
        },
    });
}
