import React from "react";
import { Flex, Text, Button, List } from "@chakra-ui/react";

const PlayerList = ({ players, isAdmin, removePlayer, openEditModal }) => {
  console.log("PlayerList players:", players);

  return (
    <List spacing={3} mt={5}>
      {players.slice(2).map((player, index) => {
        if (index % 2 === 0) {
          return (
            <Flex
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={3}
              bg="white"
              justifyContent="space-between"
              alignItems="center"
              margin="5px 0"
            >
              <Flex alignItems="center" justifyContent="flex-start">
                {isAdmin && (
                                    <Flex flexDirection="column">
                                    <Button mb="5px" colorScheme="pink" onClick={() => removePlayer(index + 2)}>
                                      삭제
                                    </Button>
                                    <Button mt="5px" colorScheme="teal" onClick={() => openEditModal(index + 2, player)}>
                                      수정
                                    </Button>
                                  </Flex>
                                )}
                                <Text m={5} fontSize="xl" color="black">
                                  {player}
                                </Text>
                              </Flex>
                              <Text fontSize="xl" fontWeight="bold" mx={5} color="black">
                                VS
                              </Text>
                              <Flex alignItems="center" justifyContent="flex-end">
                                <Text m={5} fontSize="xl" color="black">
                                  {players[index + 3] || "대기중.."}
                                </Text>
                                {isAdmin && players[index + 3] && (
                                  <Flex flexDirection="column" ml={2}>
                                    <Button mb="5px" colorScheme="pink" onClick={() => removePlayer(index + 3)}>
                                      삭제
                                    </Button>
                                    <Button mt="5px" colorScheme="teal" onClick={() => openEditModal(index + 3, players[index + 3])}>
                                      수정
                                    </Button>
                                  </Flex>
                                )}
                              </Flex>
                            </Flex>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </List>
                  );
                };
                
                export default PlayerList;
                
