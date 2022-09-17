import { Center, Container, Flex, Image, Link } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import logo from "../img/logo.svg";

const Header = () => {

    
    return(
        <Center>
            <Container maxW={"4xl"}>
            <Flex
                        minH={'60px'}
                        py={{ base: 2 }}
                        pt={"36px"}
                        align={'center'}
                    >
                        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                            <Link href="/"><Image src={logo.src} /></Link>
                        </Flex>
                        <Flex flexGrow={1} justifyContent={"right"} gap={3}>
                            <ConnectButton />
                            {/* <IconButton
                                aria-label="Open Menu"
                                size="lg"
                                mr={2}
                                icon={<HamburgerIcon />}
                                onClick={handleMenuOpen}
                            /> */}
                            
                        </Flex>
                    </Flex>
            </Container>
        </Center>
    )
}

export default Header;