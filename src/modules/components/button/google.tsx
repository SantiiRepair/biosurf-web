import { useState } from 'react';
import { Button, Center, Text } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

interface GoogleProps {
    text: string;
    query: string;
}

export default function GoogleButton({ text, query }: GoogleProps) {
    const [accessToken, setAccessToken] = useState('');
    function SignIn() {
        useGoogleLogin({
            onSuccess: async tokenResponse => {
                setAccessToken(tokenResponse.access_token);
                await axios.post(
                    `${process.env.BACKEND_URL}/user/google?${query}`,
                    {
                        googleToken: accessToken,
                    },
                );
            },
        });
    }

    return (
        <Center p={0}>
            <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
                onClick={() => {
                    SignIn();
                }}
            >
                <Center>
                    <Text>{text}</Text>
                </Center>
            </Button>
        </Center>
    );
}
