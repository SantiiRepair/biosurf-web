import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { COOKIES } from './login';

export const Logout = async () => {
    const router = useRouter();
    Cookie.remove(COOKIES.authToken);
    await router.push('/login');
};