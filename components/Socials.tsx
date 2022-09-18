import { Box, Container, Center, Icon } from "@chakra-ui/react"
import { Link } from "@chakra-ui/react"
import { VscGithub, VscTwitter } from "react-icons/vsc";


const Socials = () => {
    return(
        <Center fontSize={"2xl"} color="#008F0E" width={"100vw"} position={"fixed"} bottom="42px">
            <Link p="3px" href="https://github.com/mickdegraaf/fleur"><Icon as={VscGithub} /></Link>
            <Link p="3px" href="https://twitter.com/theo__0101"><Icon as={VscTwitter} /></Link>
            <Link p="3px" href="https://twitter.com/feder_eth"><Icon as={VscTwitter} /></Link>
            <Link p="3px" href="https://twitter.com/MickdeG010"><Icon as={VscTwitter} /></Link>
        </Center>
    )
}

export default Socials