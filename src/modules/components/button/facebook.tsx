import { Button, Center, Text } from '@chakra-ui/react';
import { FaFacebook } from 'react-icons/fa';

export default function FacebookButton() {
    return (
        <Center p={0}>
            <Button
                w={'full'}
                maxW={'md'}
                colorScheme={'facebook'}
                leftIcon={<FaFacebook />}
            >
                <Center>
                    <Text>Continue with Facebook</Text>
                </Center>
            </Button>
        </Center>
    );
}
