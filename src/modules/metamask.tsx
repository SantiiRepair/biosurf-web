import { Button } from "@chakra-ui/react";
import useIcons from "../icons";
import { useEthers } from "@usedapp/core";

function MetamaskButton() {
    const { Metamask, GreenDot } = useIcons();
    const { active, activateBrowserWallet, account } = useEthers();
    return (
        <>
            {account != undefined && active ? (
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
        </>
    );
}

export default MetamaskButton;
