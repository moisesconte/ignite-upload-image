import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [selectedUrl, setSelectedUrl] = useState('');
  // MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();

  // SELECTED IMAGE URL STATE
  // FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(urlImage) {
    setSelectedUrl(urlImage);
    onOpen();
  }

  return (
    <>
      {/* CARD GRID */}
      <SimpleGrid columns={3} spacing={10}>
        {cards.map(card => (
          <Box key={card.id}>
            <Card data={card} viewImage={() => handleViewImage(card.url)} />
          </Box>
        ))}
      </SimpleGrid>

      {/* MODALVIEWIMAGE */}
      <ModalViewImage imgUrl={selectedUrl} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
