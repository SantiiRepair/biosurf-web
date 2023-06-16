import Router from 'next/router';
import { catchAxiosError } from './error';
import { post } from './rest';
import { RegisterInputs } from '../types/pages';

export async function Register(inputs: RegisterInputs): Promise<string | void> {
    const data = new URLSearchParams(inputs);
    const res: any = await post('/user/register', data).catch(catchAxiosError);
    if (res.error) {
        return res.error;
    } else if (!res.data || !res.data.token) {
        return 'Something went wrong!';
    }

    await Router.push('/login');
}
