import { useHistory } from "react-router-dom";
import React, { useGlobal, useState } from "reactn";
import {
  Input,
  Button,
  Box,
  Alert,
  AlertIcon,
  Container,
  Center,
  Flex,
  Heading,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import DarkModeButton from "./DarkModeButton";
const Home = () => {
  const [roomID, setRoomID] = useGlobal("roomID");
  const [username, setUsername] = useGlobal("username");
  const [alertUser, setAlertUser] = useState(false);
  const [alertRoom, setAlertRoom] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    let user = username.replace(/\s/g, "");
    let room = roomID.replace(/\s/g, "");

    if (username === undefined || user === "") return setAlertUser(true);
    if (roomID === undefined || room === "") return setAlertRoom(true);
    localStorage.setItem("username", user);
    history.push(`/rooms/${room}`);
  }
  return (
    <>
      <Container maxW="max" maxH="max">
        <Center>
          <Image
            margin="2"
            borderRadius="3xl"
            src="/dogeWow.png"
            alt="wow doge"
          />
        </Center>
        <Flex flexDirection="row-reverse">
          <DarkModeButton position="absolute" margin="2" size="md" />
        </Flex>
        <Box
          maxW="md"
          borderColor={colorMode === "dark" ? "whiteAlpha.300" : "gray.200"}
          borderWidth="1px"
          borderRadius="lg"
          padding="4"
          textAlign="center"
        >
          <Heading textAlign="center" marginY="2">
            Enter room
          </Heading>
          <form onSubmit={handleSubmit}>
            <Input
              isRequired={true}
              maxW="sm"
              margin="1.5"
              placeholder="username"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
            {alertUser && (
              <Alert status="warning" w="sm" marginX="1.5" marginY="2">
                <AlertIcon /> Username is required
              </Alert>
            )}
            <Input
              isRequired={true}
              maxW="sm"
              margin="1.5"
              placeholder="roomID"
              value={roomID || ""}
              onChange={(e) => setRoomID(e.target.value)}
            />
            {alertRoom && (
              <Alert status="warning" w="sm" marginX="1.5" marginY="2">
                <AlertIcon /> RoomID is required
              </Alert>
            )}
            <Center>
              <Button
                isDisabled={!roomID || !username ? true : false}
                onClick={handleSubmit}
                type="submit"
              >
                Enter
              </Button>
            </Center>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Home;
