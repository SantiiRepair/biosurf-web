import { useGoogleOneTapLogin } from '@react-oauth/google';

export const GoogleAuth = () => {
    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            console.log(credentialResponse);
        },
        onError: () => {
            console.log('Login Failed');
        },
    });
};
