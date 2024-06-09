import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const GameControls = ({ isAdmin, isStart, players, startCurrentGame, endCurrentGame, removePlayer, openEditModal, matchType, setMatchType }) => {
  return (
    <Box mt={5} textAlign="center">
      {isAdmin && (
        <>
          <Text fontSize="xl" fontWeight="bold" mt={10} mb={5} color={isStart ? "green.500" : "black"}>
            {isStart ? (
              <span>
                매치 진행중! <br />
                종료 시 매치 종료 버튼을 눌러주세요!
              </span>
            ) : (
              <span>
                매치 대기중.. <br />
                시작 시 매치 시작 버튼을 눌러주세요!
              </span>
            )}
          </Text>
          <Text color={matchType === "normal" ? "green.500" : "red.500"} fontWeight="bold" fontSize="lg" mt={2} mb={4}>
              {matchType === "normal" ? "일반 모드 : 승리 시 3 포인트, 패배 시 1 포인트" : "데스매치 모드 : 승리 시 6 포인트, 패배 시 -3 포인트"}
          </Text>
        </>
        
      )}

      <Flex fontSize="lg" fontFamily="Arial, sans-serif" bg="white" p={2} borderRadius="md" alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" justifyContent="flex-start">
          {isAdmin && !isStart && players[0] !== "대기중.." && (
            <Flex flexDirection="column" mr={2}>
              <Button mb="5px" colorScheme="pink" onClick={() => removePlayer(0)}>
                삭제
              </Button>
              <Button mt="5px" colorScheme="teal" onClick={() => openEditModal(0, players[0])}>
                수정
              </Button>
            </Flex>
          )}
          <Text fontSize="xl" fontWeight="bold" mx={5} color="black">
            {players[0] || "대기중.."}
          </Text>
        </Flex>
        <Text fontSize="xl" fontWeight="bold" mx={5} color="black">
          VS
        </Text>
        <Flex alignItems="center" justifyContent="flex-end">
          <Text fontSize="xl" fontWeight="bold" mx={5} color="black">
            {players[1] || "대기중.."}
          </Text>
          {isAdmin && !isStart && players[1] !== "대기중.." && (
            <Flex flexDirection="column" ml={2}>
              <Button mb="5px" colorScheme="pink" onClick={() => removePlayer(1)}>
                삭제
              </Button>
              <Button mt="5px" colorScheme="teal" onClick={() => openEditModal(1, players[1])}>
                수정
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>

      {isAdmin && players.length > 1 && (
        <Box mt={5} mb={10} textAlign="center">
            <Flex justify="center" gap="4" mb={4}>
              <Button w="50%" textColor="black" colorScheme={matchType === "normal" ? "blue" : "black"} onClick={() => setMatchType("normal")} mr={2}>
                일반 모드
              </Button>
              <Button w="50%" textColor="black" colorScheme={matchType === "deathmatch" ? "red" : "black"} onClick={() => setMatchType("deathmatch")}>
                데스매치 모드
              </Button>
            </Flex>
          <Flex justify="center" gap="4">
            {!isStart ? (
              <Button colorScheme="teal" onClick={startCurrentGame} w="100%" fontWeight="bold">
                매치 시작
              </Button>
            ) : (
              <Button colorScheme="red" onClick={endCurrentGame} w="100%" fontWeight="bold">
                매치 종료
              </Button>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default GameControls;
