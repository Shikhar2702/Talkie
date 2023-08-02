import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Avatar,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorMode = useColorMode();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <Tooltip label="View Profile" placement="bottom">
          <IconButton
            display="flex"
            icon={<Avatar size="sm" src={user.pic} alt={user.name} />}
            size="sm"
            onClick={onOpen}
            bg="none"
            color={colorMode === "light" ? "black" : "white"}
            border="none"
            borderRadius="3xl"
          />
        </Tooltip>
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize={{ base: "24px", md: "36px" }}
            fontfamily="Work sans"
            display="flex"
            textAlign="center"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            justifyContent="space-between"
            p={{ base: 4, md: 8 }}
          >
            <Image
              borderRadius="full"
              boxSize={{ base: "135px", md: "150px" }}
              src={user.pic}
              alt={user.name}
              mb="auto"
            />
            <VStack align="center" spacing={{ base: 2, md: 4 }}>
              <Text
                fontSize={{ base: "20px", md: "24px" }}
                fontFamily="Work Sans"
                flex="column"
              >
                ID: {user.email}
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
