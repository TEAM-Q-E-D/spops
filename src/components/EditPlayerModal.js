import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const EditPlayerModal = ({
  isOpen,
  onClose,
  editedPlayerName,
  setEditedPlayerName,
  saveEditedPlayerName,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>이름 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>새로운 이름</FormLabel>
            <Input
              type="text"
              value={editedPlayerName}
              onChange={(e) => setEditedPlayerName(e.target.value)}
              color="black"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={saveEditedPlayerName}>
            수정 완료
          </Button>
          <Button variant="ghost" onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPlayerModal;
