import { Button, Center, Text } from '@chakra-ui/react';
import {
    GoogleOAuthProvider,
    useGoogleLogin as GoogleLogin,
} from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

interface GoogleProps {
    text: string;
}

export default function GoogleButton({ text }: GoogleProps) {
    return (
        <Center p={0}>
            <GoogleOAuthProvider clientId={process.env.CLIENT_ID!}>
                <Button
                    w={'full'}
                    maxW={'md'}
                    variant={'outline'}
                    leftIcon={<FcGoogle />}
                    onClick={() => {
                        GoogleLogin({
                            onSuccess: tokenResponse =>
                                console.log(tokenResponse),
                        });
                    }}
                >
                    <Center>
                        <Text>{text}</Text>
                    </Center>
                </Button>
            </GoogleOAuthProvider>
        </Center>
    );
}
