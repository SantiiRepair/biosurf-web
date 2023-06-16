import { useGoogleOneTapLogin } from '@react-oauth/google';

export default function GoogleAuth() {
    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            console.log(credentialResponse);
        },
        onError: () => {
            console.log('Login Failed');
        },
    });
}
