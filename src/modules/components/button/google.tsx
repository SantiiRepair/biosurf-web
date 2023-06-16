import { GoogleAuth } from '@/src/auth/google';
import { Button, Center, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleProps {
    text: string;
}

export default function GoogleButton({ text }: GoogleProps) {
    return (
        <Center p={0}>
            <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
                onClick={GoogleAuth}
            >
                <Center>
                    <Text>{text}</Text>
                </Center>
            </Button>
        </Center>
    );
}
