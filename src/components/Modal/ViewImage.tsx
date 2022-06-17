import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // MODAL WITH IMAGE AND EXTERNAL LINK

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent shadow="none" bg="transparent" w="max" maxW="900px">
        <ModalBody>
          <Image
            src={imgUrl}
            alt="image viwer"
            maxH="600px"
            w="100%"
            h="100%"
            objectFit="cover"
            borderTopRadius="md"
          />
          <ModalFooter
            bg="gray.800"
            h="32px"
            justifyContent="left"
            borderBottomRadius="md"
          >
            <Link fontSize="sm" href={imgUrl} isExternal>
              Abrir original
            </Link>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
