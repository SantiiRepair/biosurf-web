
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import GoogleButton from "@/src/modules/components/button/google";
import FacebookButton from "@/src/modules/components/button/facebook";
import { Register } from "@/src/auth/register";
import { RegisterInputs } from "@/src/types/pages";
import axios from "axios";

export function CreateAccount() {
    const [ipv4, setIpv4] = useState("");
    const initialValues: RegisterInputs = {
        name: "",
        lastname: "",
        email: "",
        password: "",
        ipv4: ipv4,
    };

    const [inputs, setInputs] = useState(initialValues);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const ip = await axios.get("https://ipv4.jsonip.com/");
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
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter your email below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                    <Button variant="outline">
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                        Github
                    </Button>
                    <Button variant="outline">
                        <Icons.google className="mr-2 h-4 w-4" />
                        Google
                    </Button>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Create account</Button>
            </CardFooter>
        </Card>
    );
}
