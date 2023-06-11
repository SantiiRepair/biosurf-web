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
  Center,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useRouter } from "next/router";
import { cookies } from "next/headers";

function FacebookButton() {
  return (
    <Center p={0}>
      <Button
        w={"full"}
        maxW={"md"}
        colorScheme={"facebook"}
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
  return (
    <Center p={0}>
      <Button
        w={"full"}
        maxW={"md"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
}

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ipv4, setIpv4] = useState("");
  const baseLink = "https://drn14r-8080.csb.app"; // https://api.smsuances.club

  useEffect(() => {
    getIpv4();
    const cookieStore = cookies();
    const session = cookieStore.get("smsuances_session");
    if (session) {
      router.push("/dashboard");
    }
  }, [router]);

  const register = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post(`${baseLink}/user/register`, {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        // ipv4: ipv4,
      });
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const getIpv4 = async () => {
    try {
      const res = await axios.get("https://ipv4.jsonip.com/");
      setIpv4(res.data.ip);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={register}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign up
                </Button>
              </Stack>
            </form>
            <FacebookButton />
            <GoogleButton />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
