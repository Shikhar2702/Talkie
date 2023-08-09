// DeleteConfirmationModal.js

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
  // Function to handle user's confirmation to delete
  const handleDelete = () => {
    onDelete(); // Call the onDelete function to delete the user
    onClose(); // Close the modal after deletion
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete the user from database?
          <br /> Please do not delete Guest user, as it is a public id !!
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteConfirmationModal;
