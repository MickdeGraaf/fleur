import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Divider } from "@chakra-ui/react";
import NFTList from "./NFTList";
import { Input } from '@chakra-ui/react'
import { ChangeEventHandler, useEffect, useState } from "react";
import { BidStep } from "@reservoir0x/reservoir-kit-ui";

interface NFTSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedNFT: any | null;
    setSelectedNFT: (nft: any) => void;
    topBids: any[];
}

const NFTSelectModal = ({isOpen, onClose, topBids, setSelectedNFT}: NFTSelectModalProps) => {

    const [filterText, setFilterText] = useState("");
    const [filteredBids, setFilteredBids] = useState(topBids);

    // Set to all on update
    useEffect(() => {
        setFilteredBids(topBids);
    }, [topBids])

    const handleFilterTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setFilterText(e.target.value);

        const filtered = topBids.filter((bid) => {
            if(e.target.value.trim() == "") {
                return true;
            }
            if(bid.token.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                return true;
            }
            if(bid.token.contract.toLowerCase().includes(e.target.value.toLowerCase())) {
                return true;
            }
            if(bid.token.tokenId.toLowerCase().includes(e.target.value.toLowerCase())) {
                return true;
            }
            if(bid.token.collection.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                return true;
            }
            
            // if(bid.token)


            return false;

        });

        setFilteredBids(filtered);

    }

    console.log("Filtered bids", filteredBids);

    let totalValue = 0;
    for(let nft of filteredBids) {
        totalValue += nft.value;
    }

    return (
        <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select an NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={filterText} onChange={handleFilterTextChange} placeholder="Search by NFT id, name or address" />
            <Divider my="8px" />
            Total value of NFTs meeting criteria: {totalValue} ETH
            <Divider my="8px" />
            <NFTList topBids={filteredBids} setSelectedNFT={setSelectedNFT} />
          </ModalBody>
        </ModalContent>
      </Modal>
    
    )
}

export default NFTSelectModal;