import { paths, setParams } from '@reservoir0x/reservoir-kit-client';
import { Text, Box, SelectField, Flex, Center } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'
import NFTItem from './NFTItem';

interface NFTSelectorProps {
    topBids: paths['/orders/users/{user}/top-bids/v1']['get']['responses']['200']['schema']['topBids'] | any;
    selectedNFT: any | null;
    onClick: () => void;
}


const NFTSelector = ({topBids, selectedNFT, onClick}: NFTSelectorProps) => {
    // console.log(topBids);

    return(
        <Box onClick={onClick}>
            {selectedNFT ? 
                <NFTItem NFT={selectedNFT} onClick={()=>{}} />
            : 
                <Flex
                    borderRadius={"16px"}
                    bg={"#F1F1F1"}
                    w={"100%"}
                    // h={"80px"}
                >
                    {/* LEFT */}
                    <Flex flexGrow={1}  >
                        <Box p={4}>
                            <Text fontSize={"20px"} fontWeight="800">Select an NFT</Text>
                            
                            <Text>{topBids.data.length} available</Text>
                        </Box>
                    </Flex>
                    {/* RIGHT */}
                    <Flex p="4"  flex={{ base: 1 }} justifyContent="right">
                        <Flex borderRadius="8px" bg="#C4C4C4" w={"64px"} h={"64px"} alignItems="center" justifyContent={"center"}>
                            <ChevronDownIcon height={"33px"} width={"33px"} color={"black"} />
                        </Flex>
                    </Flex>
                </Flex>
            }
        </Box>
    );
};

export default NFTSelector;