import { useGoogleOneTapLogin } from '@react-oauth/google';

export default function useSocialAuth() {
    function Google() {
        useGoogleOneTapLogin({
            onSuccess: credentialResponse => {
                console.log(credentialResponse);
            },
            onError: () => {
                console.log('Login Failed');
            },
        });
    }

    return { Google };
}
