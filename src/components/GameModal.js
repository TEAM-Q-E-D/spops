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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Text,
} from "@chakra-ui/react";

const GameModal = ({
  isOpen,
  onClose,
  currentGamePlayers,
  player1Score,
  setPlayer1Score,
  player2Score,
  setPlayer2Score,
  submitGameResult,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>경기 결과 제출</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign="center">
          <Text fontSize="xl" fontWeight="bold">
            {currentGamePlayers.player1} vs {currentGamePlayers.player2}
          </Text>
          <FormControl mt={4} textAlign="center">
            <FormLabel htmlFor="player1_score">{currentGamePlayers.player1}</FormLabel>
            <Slider id="player1_score" defaultValue={0} min={0} max={15} step={1} value={player1Score} onChange={setPlayer1Score}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
            <Text fontSize="xl" fontWeight="bold">{player1Score}</Text>
          </FormControl>

          <FormControl mt={4} textAlign="center">
            <FormLabel htmlFor="player2_score">{currentGamePlayers.player2}</FormLabel>
            <Slider id="player2_score" defaultValue={0} min={0} max={15} step={1} value={player2Score} onChange={setPlayer2Score}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
            <Text fontSize="xl" fontWeight="bold">{player2Score}</Text>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={submitGameResult}>
            결과 제출
          </Button>
          <Button variant="ghost" onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameModal;
