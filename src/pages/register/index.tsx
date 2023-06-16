import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import GoogleButton from '@/src/modules/components/button/google';
import FacebookButton from '@/src/modules/components/button/facebook';
import { Register } from '@/src/auth/register';
import { RegisterInputs } from '@/src/types/pages';
import axios from 'axios';

function RegisterPage() {
    const [ipv4, setIpv4] = useState('');
    const initialValues: RegisterInputs = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        ipv4: ipv4,
    };

    const [inputs, setInputs] = useState(initialValues);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const ip = await axios.get('https://ipv4.jsonip.com/');
        setIpv4(ip.data.ip);
        const res = await Register(inputs);
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
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
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
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            onChange={handleInputChange}
                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastname" isRequired>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            onChange={handleInputChange}
                                        />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        id="password"
                                        name="password"
                                        onChange={handleInputChange}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword(
                                                    showPassword =>
                                                        !showPassword,
                                                )
                                            }
                                        >
                                            {showPassword ? (
                                                <ViewIcon />
                                            ) : (
                                                <ViewOffIcon />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    type="submit"
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        </form>
                        <GoogleButton text="Sign up with Google" />
                        <FacebookButton text="Continue with Facebook" />
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default RegisterPage;
