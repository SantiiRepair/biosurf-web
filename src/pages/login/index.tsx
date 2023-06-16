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
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Login } from '../../auth/login';
import FacebookButton from '@/src/modules/components/button/facebook';
import GoogleButton from '@/src/modules/components/button/google';
import { LoginInputs } from '@/src/types/pages';

function LoginPage() {
    const initialValues: LoginInputs = { email: '', password: '' };

    const [inputs, setInputs] = useState(initialValues);
    const [error, setError] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await Login(inputs);
        if (res) setError(res);
    };

    const handleInputChange = (e: React.ChangeEvent<any>) => {
        e.persist();
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
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
                        <form onSubmit={handleSubmit}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleInputChange}
                                    value={inputs.email}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={handleInputChange}
                                    value={inputs.password}
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
                            </Stack>
                        </form>
                        <GoogleButton text="Sign in with Google" />
                        <FacebookButton text="Continue with Facebook" />
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default LoginPage;
