
import { FaFacebook } from "react-icons/fa";
import { useLogin } from "react-facebook";
import { Button } from "../components/ui/button";

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
        <Button
            variant={"outline"}
            onClick={() => auth()}
        >
            <FaFacebook />
            <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>
        </Button>
    );
}
