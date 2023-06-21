import React from "react";
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { get } from "@/src/auth/rest";
import { Props } from "@/src/types/pages";
import SidebarContent from "@/src/modules/components/sidebar";
import MobileNav from "@/src/modules/components/navbar/mobile";
import { AuthProps, privateRoute } from "@/src/private/route";

type DashboardProps = {
    name: string;
    lastname: string;
};

function Dashboard({ name, lastname }: DashboardProps) {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { asPath } = router;

    let content: any;
    switch (asPath) {
        case "/dashboard/home":
            content = (
                <Box w="100%" h="100vh" p="4">
                    Seleccione una subpágina
                </Box>
            );
            break;
        case "/dashboard/contenido/subpage2":
            content = (
                <Box w="100%" h="100vh" p="4">
                    Seleccione una subpágina
                </Box>
            );
            break;
        default:
            content = (
                <Box w="100%" h="100vh" p="4">
                    Seleccione una subpágina
                </Box>
            );
            break;
    }

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
            <MobileNav onOpen={onOpen} name={name} lastname={lastname} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {content}
            </Box>
        </Box>
    );
}

Dashboard.getInitialProps = async ({ auth }: AuthProps): Promise<Props> => {
    let message = "Something unexpected happened!";
    let name = "";
    let lastname = "";
    const res: any = await get("/user/info", {
        headers: {
            Authorization: auth.authorization,
        },
    });

    if (res.error) {
        message = res.error;
        await Router.push("/login?redirected=true");
    } else if (res.data) {
        name = res.data.name;
        lastname = res.data.lastname;
    }

    return { message, auth, name, lastname };
};

export default privateRoute(Dashboard);
