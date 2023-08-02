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
            fontSize="40px"
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
            flexDir="column"
            alignItems="center"
            textAlign="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
              mx="auto"
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontfamily="Work sans"
            >
              ID : {user.email}
            </Text>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
