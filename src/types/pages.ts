import { AuthProps } from '../auth/route';

export type LoginInputs = {
    email: string;
    password: string;
};

export type RegisterInputs = {
    email: string;
    password: string;
};

export type Props = AuthProps & {
    message: string;
};
