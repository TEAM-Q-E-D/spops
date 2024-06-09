import React, { useState } from "react";
import {
  Flex,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";

const AdminMode = ({ isAdmin, setIsAdmin, newPlayer, setNewPlayer, addPlayer, addDumy }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const checkAdminPassword = () => {
    if (adminPassword === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAdmin(true);
      setPasswordError(false);
      onClose();
    } else {
      setPasswordError(true);
    }
    setAdminPassword("");
  };

  return (
    <>
      <Flex justifyContent="space-between" mb={5} align="center">
        <Button bg={isAdmin ? "blue.400" : "blue.100"} fontWeight="bold" color="white" onClick={onOpen} w="50%">
          관리자 모드
        </Button>
        <Button bg={isAdmin ? "blue.100" : "blue.400"} ml={2} fontWeight="bold" color="white" onClick={() => setIsAdmin(false)} w="50%">
          플레이어 모드
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>관리자 암호 입력</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {passwordError && <Text color="red.500">암호가 틀렸습니다.</Text>}
            <Input
              placeholder="암호 입력"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  checkAdminPassword();
                }
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={checkAdminPassword}>
              확인
            </Button>
            <Button variant="ghost" onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isAdmin && (
        <FormControl mt={5}>
          <FormLabel htmlFor="new-player" fontWeight="bold" fontSize="xl" color="black">
            대기열에 이름을 등록하세요!
          </FormLabel>
          <Flex>
            <Input
              id="new-player"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addPlayer();
                }
              }}
              bg="white"
              color="black"
            />
            <Button colorScheme="teal" ml={2} onClick={addPlayer}>
              등록
            </Button>
            <Button colorScheme="pink" ml={2} onClick={addDumy}>
              빈자리 추가
            </Button>
          </Flex>
        </FormControl>
      )}
    </>
  );
};

export default AdminMode;
