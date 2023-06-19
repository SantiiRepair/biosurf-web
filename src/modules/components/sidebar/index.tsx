import {
    Box,
    BoxProps,
    CloseButton,
    Flex,
    Image,
    useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
    FiCompass,
    FiHome,
    FiSettings,
    FiStar,
    FiTrendingUp,
} from "react-icons/fi";
import NavItem from "../navbar/item";

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

interface LinkItemProps {
    name: string;
    icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome },
    { name: "Trending", icon: FiTrendingUp },
    { name: "Explore", icon: FiCompass },
    { name: "Favourites", icon: FiStar },
    { name: "Settings", icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Image
                    alt="Logo"
                    src="/images/sns-transparent.png"
                    width={70}
                />
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map(link => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

export default SidebarContent;
