import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
// import { useUserTokens } from '../hooks/useUserTokens';
import styles from '../styles/Home.module.css';
import { useReservoirClient, useTokens, AcceptBidModal } from '@reservoir0x/reservoir-kit-ui'
import { useEffect, useState } from 'react';
import { useUserTopBids } from '../hooks/reservoir';
import { Box, Center, Container, Text, Button } from '@chakra-ui/react';
import NFTSelector from '../components/NFTSelector';
import NFTSelectModal from '../components/NFTSelectModal';
import Header from '../components/Header';
import { useAccount } from 'wagmi'

const Home: NextPage = () => {

  const { address } = useAccount();

  const topBids = useUserTopBids(address, {}) || {data: []};
  // @ts-ignore
  const [selectedNFT, setSelectedNFT] = useState((topBids && topBids.data) ? topBids.data[0] : undefined);
  
  const [isSelectModalOpen, setSelectModalOpen] = useState(false);

  useEffect(() => {
    // setSelectedNFT(topBids.data[0]);
    // @ts-ignore
    setSelectedNFT(undefined);
  }, [topBids.data]);

  if(!topBids.data) {
    <Text>No bids found</Text>
  }

  const handleOpenSelectModal = () => {
    setSelectModalOpen(true);
  }

  const handleNFTItemClick = (item: any) => {
    setSelectedNFT(item);
    setSelectModalOpen(false);
  };

  return (
    <Box>
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <Header />
      <Center>
        <Container 
          maxW="md"
          boxShadow={"2xl"}
          m="3em"
          p="1em"
          borderRadius="16px"
          bg="#FFFFFF"
        >
          <Text textAlign={"center"} fontSize="20px" fontWeight={700}>Instantly sell an NFT</Text>
          <NFTSelector onClick={handleOpenSelectModal} topBids={topBids} selectedNFT={selectedNFT}/>
          <NFTSelectModal setSelectedNFT={handleNFTItemClick} isOpen={isSelectModalOpen} onClose={() => {setSelectModalOpen(false)}} selectedNFT={null} topBids={topBids.data} />
          {/* {selectedNFT && <SellSteps NFT={selectedNFT} />} */}

          { selectedNFT && selectedNFT.token && 
            <AcceptBidModal 
              trigger={
                <Button variant={"solid"} w="100%" size={"lg"} bg="linear-gradient(180deg, #D4EF00 6.77%, rgba(182, 211, 1, 0) 100%), #55DF00;" p="8">
                  Accept Bid
                </Button>
              }
              collectionId={selectedNFT.token.contract}
              tokenId={selectedNFT.token.tokenId}
              onBidAccepted={(data) => {
                console.log('Bid Accepted', data)
              }}
              onBidAcceptError={(error, data) => {
                console.log('Bid Acceptance Error', error, data)
              }}
              onClose={() => {
                console.log('AcceptBidModal Closed')
              }}
            />}
        </Container>
      </Center>

    </Box>
  );
};

export default Home;
