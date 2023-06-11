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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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

export default function Login() {
  const router = useRouter();
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

  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post(`${baseLink}/user/login`, {
        email: email,
        password: password,
        // ipv4: ipv4,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const getIpv4 = async () => {
    const res = await axios.get("https://ipv4.jsonip.com/");
    setIpv4(res.data.ip);
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={login}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
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
