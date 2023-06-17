import { useState } from 'react';
import { Button, Center, Text } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { SignIn } from '@/src/auth/google';

interface GoogleProps {
    text: string;
    query: string;
}

export default function GoogleButton({ text, query }: GoogleProps) {
    return (
        <Center p={0}>
            <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
                onClick={() => {
                    SignIn(query);
                }}
            >
                <Center>
                    <Text>{text}</Text>
                </Center>
            </Button>
        </Center>
    );
}
