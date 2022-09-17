import { Box } from "@chakra-ui/react";
import NFTItem from "./NFTItem";


interface NFTListProps {
    topBids: any[];
    setSelectedNFT: (nft: any) => void;
}



const NFTList = ({topBids, setSelectedNFT}: NFTListProps) => {
    

    const handleClick = (item: any) => () => {
        setSelectedNFT(item);
        console.log("NFT set");
    }

    return(
        <Box maxH={"60vh"} overflow="scroll">
            {topBids.map((topBid, index) => (<NFTItem onClick={handleClick(topBid)} NFT={topBid} key={index} />))}
        </Box>
    );
}

export default NFTList;