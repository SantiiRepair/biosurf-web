import { Button, Center, Text } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleButton() {
    return (
        <Center p={0}>
            <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
            >
                <Center>
                    <Text>Sign in with Google</Text>
                </Center>
            </Button>
        </Center>
    );
}
