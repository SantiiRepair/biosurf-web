import { Button, Center, Text } from '@chakra-ui/react';
import { FaFacebook } from 'react-icons/fa';

interface FacebookProps {
    text: string;
}

export default function FacebookButton({ text }: FacebookProps) {
    return (
        <Center p={0}>
            <Button
                w={'full'}
                maxW={'md'}
                colorScheme={'facebook'}
                leftIcon={<FaFacebook />}
            >
                <Center>
                    <Text>{text}</Text>
                </Center>
            </Button>
        </Center>
    );
}
