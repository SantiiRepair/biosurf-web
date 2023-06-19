import {
    Avatar,
    Box,
    Button,
    Flex,
    FlexProps,
    Text,
    HStack,
    Image,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import useIcons from "../icons";
import { useEthers } from "@usedapp/core";
import { FiChevronDown, FiMenu } from "react-icons/fi";

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const { Metamask, GreenDot } = useIcons();
    const { active, activateBrowserWallet, account } = useEthers();

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Image alt="Logo" src="/images/sns-transparent.png" width={70} />

            <HStack spacing={{ base: "0", md: "6" }}>
                {active ? (
                    <Button
                        variant={"solid"}
                        colorScheme={"gray"}
                        size={"sm"}
                        mr={4}
                        leftIcon={<GreenDot />}
                        aria-label={""}
                    >
                        {account != undefined &&
                            account?.substring(0, 6) +
                                "..." +
                                account?.substring(38)}
                    </Button>
                ) : (
                    <Button
                        variant={"solid"}
                        colorScheme={"gray"}
                        size={"sm"}
                        mr={4}
                        leftIcon={<Metamask />}
                        onClick={activateBrowserWallet}
                        aria-label={""}
                    >
                        Connect Wallet
                    </Button>
                )}
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <HStack>
                                <Avatar
                                    size={"sm"}
                                    src={
                                        "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                    }
                                />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">Justina Clark</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "gray.900")}
                            borderColor={useColorModeValue(
                                "gray.200",
                                "gray.700",
                            )}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider />
                            <MenuItem>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

export default MobileNav;