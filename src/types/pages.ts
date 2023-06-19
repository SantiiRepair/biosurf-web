import { AuthProps } from "../auth/route";

export type LoginInputs = {
    email: string;
    password: string;
};

export type RegisterInputs = {
    name: string;
    lastname: string;
    email: string;
    password: string;
    ipv4: string;
};

export type Props = AuthProps & {
    message: string;
};
