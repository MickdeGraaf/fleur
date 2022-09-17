import flowers from "../img/flowers.png";
import { Box, Center } from "@chakra-ui/react";

const Flowers = () => {
    return (
        <Center>
        <Box width={"100%"} position={"fixed"} bottom="0">
            <img width={"100%"} src={flowers.src} />
        </Box>
        </Center>
    )
}

export default Flowers;