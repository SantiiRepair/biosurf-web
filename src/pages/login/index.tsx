import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    Center,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';
import useSocialAuth from '@/src/hooks/useSocialAuth';

function FacebookButton() {
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

function GoogleButton() {
    const { Google } = useSocialAuth();

    return (
        <Center p={0}>
            <Button
                w={'full'}
                maxW={'md'}
                variant={'outline'}
                leftIcon={<FcGoogle />}
                onClick={Google}
            >
                <Center>
                    <Text>Sign in with Google</Text>
                </Center>
            </Button>
        </Center>
    );
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const res = await axios.get('https://ipv4.jsonip.com/');
        signIn('credentials', {
            email,
            password,
            callbackUrl: `${window.location.origin}/welcome`,
        });
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool{' '}
                        <Link color={'blue.400'}>features</Link> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Stack spacing={4}>
                        <form onSubmit={handleLogin}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    onChange={e => {
                                        setEmail(e.target.value);
                                    }}
                                    type="email"
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    onChange={e => {
                                        setPassword(e.target.value);
                                    }}
                                    type="password"
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>
                                        Forgot password?
                                    </Link>
                                </Stack>
                                <Button
                                    type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                >
                                    Sign in
                                </Button>

                                <FacebookButton />
                                <GoogleButton />
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
