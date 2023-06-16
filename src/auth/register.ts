import Cookie from 'js-cookie';
import Router from 'next/router';
import { LoginInputs } from '../pages/login';
import { catchAxiosError } from './error';
import { post } from './rest';

export async function Register(inputs: LoginInputs): Promise<string | void> {
    const data = new URLSearchParams(inputs);
    const res: any = await post('/user/login', data).catch(catchAxiosError);
    if (res.error) {
        return res.error;
    } else if (!res.data || !res.data.token) {
        return 'Something went wrong!';
    }

    await Router.push('/login');
}
