import { Box, Flex, Text, Image } from "@chakra-ui/react";

interface NFTItemProps {
    NFT: any;
    onClick: () => void;
}

const NFTItem = ({NFT, onClick}: NFTItemProps) => {

    console.log(NFT);
    return(
        <Flex cursor={"pointer"} onClick={onClick} bg="#F1F1F1" my="4px" pl="18px" pr="8px" py="8px" borderRadius={"16px"}>
            <Flex flexGrow={1} >
                <Box>
                    <Text noOfLines={1} fontSize={"14px"} fontWeight="800">{NFT.token.name}</Text>
                    <Text opacity={"50%"} fontWeight="700">{NFT.value} ETH</Text>
                </Box>
            </Flex>
            <Flex width="70px" flex={{ base: 1 }} justifyContent={"right"}>
                <Box>
                    <Image
                        boxSize='100px'
                        objectFit='cover'
                        src={NFT.token.image}
                        alt={NFT.token.name}
                        w={"64px"}
                        h={"64px"}
                    />
                </Box>
            </Flex>
        </Flex>
    )
};

export default NFTItem;