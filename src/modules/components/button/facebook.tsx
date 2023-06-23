import { Button, Center, Text } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import { useLogin } from "react-facebook";

interface FacebookProps {
    text: string;
}

export default function FacebookButton({ text }: FacebookProps) {
    const { login, status, isLoading, error } = useLogin();

    async function auth() {
        try {
            const response = await login({
                scope: "email",
            });

            console.log(response.status);
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <Center p={0}>
            <Button
                w={"full"}
                maxW={"md"}
                colorScheme={"facebook"}
                leftIcon={<FaFacebook />}
                onClick={() => auth()}
            >
                <Center>
                    <Text>{text}</Text>
                </Center>
            </Button>
        </Center>
    );
}
