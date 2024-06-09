import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import MarqueeText from "./MarqueeText";
import AdminMode from "./components/AdminMode";
import PlayerList from "./components/PlayerList";
import GameControls from "./components/GameControls";
import GameModal from "./components/GameModal";
import EditPlayerModal from "./components/EditPlayerModal";

const api = process.env.REACT_APP_API_URL;
const place = process.env.REACT_APP_PLACE;
const streamlit = process.env.REACT_APP_STREAMLIT_URL;
const notice = "기록안되고 있으면 새로고침 한번 해주세요! ----- 테스트 기간 동안 데이터가 유실될 수 있습니다. 양해부탁드립니다 -----";

let image_name;

if (place.startsWith("중화")) {
  image_name = "junghwa.png";
} else if (place.startsWith("서경")) {
  image_name = "seokyeong.png";
} else {
  image_name = "recordism.png";
}

function App() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [matchTime, setMatchTime] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [isGameModalOpen, setGameModalOpen] = useState(false);
  const [currentGamePlayers, setCurrentGamePlayers] = useState({ player1: "", player2: "" });
  const [editedPlayerIndex, setEditedPlayerIndex] = useState(null);
  const [editedPlayerName, setEditedPlayerName] = useState("");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [matchType, setMatchType] = useState("normal"); // 현재 모드를 관리하는 상태 추가
  const timerInterval = useRef(null);

  useEffect(() => {
    fetchPlayers();
    const interval = setInterval(fetchPlayers, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchPlayers = () => {
    axios.get(`${api}/players`, { params: { place } })
      .then(response => setPlayers(response.data))
      .catch(error => console.error(error));
  };

  const addPlayer = () => {
    if (newPlayer) {
      axios.post(`${api}/players`, { place, name: newPlayer })
        .then(() => {
          fetchPlayers();
          setNewPlayer("");
          setAlertMessage("");
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setAlertMessage("선수 등록 페이지에서 먼저 등록을 진행해주세요.");
            setNewPlayer("");
          }
          console.error(error);
        });
    }
  };

  const addDumy = () => {
    axios.post(`${api}/players`, { place, name: "빈자리" })
      .then(() => fetchPlayers())
      .catch(error => console.error(error));
  };

  const removePlayer = (index) => {
    axios.delete(`${api}/players/${index}`, { params: { place } })
      .then(() => fetchPlayers())
      .catch(error => console.error(error));
  };

  const startCurrentGame = () => {
    setIsStart(true);
    setMatchTime(0);
    const startTime = new Date().getTime();
    timerInterval.current = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      setMatchTime(elapsedSeconds);
    }, 1000);
  };

  const endCurrentGame = () => {
    if (players.length > 1) {
      setGameModalOpen(true);
      setCurrentGamePlayers({ player1: players[0], player2: players[1] });
      clearInterval(timerInterval.current);
    }
  };

  const closeResultModal = () => {
    setGameModalOpen(false);
    setIsStart(false);
    setPlayer1Score(0);
    setPlayer2Score(0);
    removePlayer(0);
    removePlayer(0);
  };

  const submitGameResult = () => {
    if (player1Score === player2Score) {
      window.alert("동점입니다. 점수를 다시 입력해주세요.");
      return;
    }
    const gameResultData = {
      place,
      player1_name: currentGamePlayers.player1,
      player1_score: player1Score,
      player2_name: currentGamePlayers.player2,
      player2_score: player2Score,
      match_time: matchTime,
      match_type: matchType, // match_type 추가
    };
    console.log("결과 보내는 데이터")
    console.log(gameResultData)

    axios.post(`${api}/result`, gameResultData)
      .then(response => console.log(response))
      .catch(error => console.error(error));
    closeResultModal();
  };

  const openEditModal = (index, playerName) => {
    setEditedPlayerIndex(index);
    setEditedPlayerName(playerName);
    setEditModalOpen(true);
  };

  const saveEditedPlayerName = () => {
    if (editedPlayerIndex !== null && editedPlayerName.trim() !== "") {
      const updatedPlayers = [...players];
      updatedPlayers[editedPlayerIndex] = editedPlayerName.trim();
      setPlayers(updatedPlayers);
      setEditedPlayerIndex(null);
      setEditedPlayerName("");

      axios.put(`${api}/players/${editedPlayerIndex}`, { place, newName: editedPlayerName.trim() })
        .then(response => console.log(response))
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setAlertMessage("선수 등록 페이지에서 먼저 등록을 진행해주세요.");
            setNewPlayer("");
          } else {
            console.error(error);
          }
        });
      setEditModalOpen(false);
    }
  };

  const openStreamlit = () => {
    window.open(streamlit, "_blank");
  };

  return (
    <Container centerContent>
      <Box mb={2} p={2} w="100%" maxW="500px" borderRadius="lg" borderWidth="2px" borderColor="gray.300">
        <MarqueeText text={notice} />
      </Box>

      <Box p={5} w="100%" maxW="500px" borderRadius="lg" bg="gray.100" borderWidth="2px" borderColor="gray.300">
        {alertMessage && (
          <Alert status="error" mb={4} backgroundColor="red.600">
            <AlertIcon />
            <AlertTitle mr={2}>에러!</AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" onClick={() => setAlertMessage("")} />
          </Alert>
        )}

        <AdminMode
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          newPlayer={newPlayer}
          setNewPlayer={setNewPlayer}
          addPlayer={addPlayer}
          addDumy={addDumy}
        />

        <Flex justifyContent="center" alignItems="center" mt={5}>
          <Image src={image_name} boxSize="100px" mr={10} />
          <Text fontSize="3xl" fontWeight="bold" mt={2} color="black">
            {players.length} 명
          </Text>
        </Flex>

        <GameControls
          isAdmin={isAdmin}
          isStart={isStart}
          players={players}
          startCurrentGame={startCurrentGame}
          endCurrentGame={endCurrentGame}
          removePlayer={removePlayer}
          openEditModal={openEditModal}
          matchType={matchType} // 현재 모드 전달
          setMatchType={setMatchType} // 현재 모드 설정 함수 전달
        />

        <PlayerList
          players={players}
          isAdmin={isAdmin}
          removePlayer={removePlayer}
          openEditModal={openEditModal}
        />

        <GameModal
          isOpen={isGameModalOpen}
          onClose={closeResultModal}
          currentGamePlayers={currentGamePlayers}
          player1Score={player1Score}
          setPlayer1Score={setPlayer1Score}
          player2Score={player2Score}
          setPlayer2Score={setPlayer2Score}
          submitGameResult={submitGameResult}
        />

        <EditPlayerModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          editedPlayerName={editedPlayerName}
          setEditedPlayerName={setEditedPlayerName}
          saveEditedPlayerName={saveEditedPlayerName}
        />

        <Box mt={2} p={2} w="100%" maxW="500px" borderRadius="lg" bg="gray.100" borderWidth="2px" borderColor="gray.300">
          <Button fontWeight="bold" textColor="white" bg="blue.400" onClick={openStreamlit} width="100%">
            선수 등록 및 기록 확인 페이지
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
