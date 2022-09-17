import { Box } from "@chakra-ui/react";
import { useFillBid } from "../hooks/reservoir";

interface SellStepsProps {
    NFT: any;
}

const SellSteps = ({NFT}: SellStepsProps) => {
    // TODO replace hard coded address
    const steps = useFillBid(NFT.token.contract, NFT.token.tokenId, NFT.id, "0x1e17A75616cd74f5846B1b71622Aa8e10ea26Cc0");

    console.log(steps);

    return(
        <Box>

        </Box>
    )
}

export default SellSteps;