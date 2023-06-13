import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}

declare module 'prisma' {
    export * from '@prisma/client';
}
