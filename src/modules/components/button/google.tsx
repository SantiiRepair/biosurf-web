import { useState } from 'react';
import { Button, Center, Text } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

interface GoogleProps {
    text: string;
}

export default function GoogleButton({ text }: GoogleProps) {
    const [accessToken, setAccessToken] = useState('');
    const signIn = useGoogleLogin({
        onSuccess: tokenResponse => {
            setAccessToken(tokenResponse.access_token);
        },
    });

    return (
        <Center p={0}>
            <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
                onClick={() => {
                    signIn();
                }}
            >
                <Center>
                    <Text>{text}</Text>
                </Center>
            </Button>
        </Center>
    );
}
