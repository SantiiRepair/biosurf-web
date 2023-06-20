import React, { ReactNode, useEffect, useState } from "react";
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from "@chakra-ui/react";
import Router from "next/router";
import { AuthProps, privateRoute } from "@/src/auth/route";
import { get } from "@/src/auth/rest";
import { Props } from "@/src/types/pages";
import SidebarContent from "@/src/modules/components/sidebar";
import MobileNav from "@/src/modules/components/navbar/mobile";

function Dashboard({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);

    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

Dashboard.getInitialProps = async ({ auth }: AuthProps): Promise<Props> => {
    let message = "Something unexpected happened!";
    const res: any = await get("/user/restricted", {
        headers: {
            Authorization: auth.authorization,
        },
    });

    if (res.error) {
        message = res.error;
        await Router.push("/login");
    } else if (res.data && res.data.message) {
        message = res.data.message;
    }

    return { message, auth };
};

export default privateRoute(Dashboard);
