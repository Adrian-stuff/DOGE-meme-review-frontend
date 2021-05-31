import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import React, { useGlobal, useState } from "reactn";
import {
  Input,
  Button,
  Box,
  Alert,
  AlertIcon,
  AlertDialog,
  Container,
  Center,
  Flex,
  Heading,
  Image,
  useColorMode,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  Divider,
  AlertDialogFooter,
  AlertDialogBody,
} from "@chakra-ui/react";
import DarkModeButton from "./DarkModeButton";
import Rooms from "./Rooms";
import { useEffect } from "react";
const Home = () => {
  const [roomID, setRoomID] = useGlobal("roomID");
  const [username, setUsername] = useGlobal("username");
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useGlobal("rooms");
  const [alertUser, setAlertUser] = useState(false);
  const [alertDialogUser, setAlertDialogUser] = useState(false);

  const [alertRoom, setAlertRoom] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(username ? false : true);
  const { colorMode } = useColorMode();

  const history = useHistory();

  const cancelRef = React.useRef();
  function handleUsernameSubmit(e) {
    e.preventDefault();
    let user = username.replace(/\s/g, "");
    if (username === undefined || user === "") return setAlertDialogUser(true);
    localStorage.setItem("username", user);
    setIsAlertOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let user = username.replace(/\s/g, "");
    let room = roomID.replace(/\s/g, "");

    if (username === undefined || user === "") return setAlertUser(true);
    if (roomID === undefined || room === "") return setAlertRoom(true);
    localStorage.setItem("username", user);
    history.push(`/rooms/${room}`);
  }
  useEffect(() => {
    let s = io("https://doge-meme-server.herokuapp.com/");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;
    setInterval(() => socket.emit("getAllRooms"), 2000);
    return () => clearInterval();
  }, [socket]);

  useEffect(() => {
    if (socket == null) return;

    socket.on("getAllRooms", (room) => {
      console.log(room);
      setRooms(room);
    });
  }, [socket, setRooms]);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        // onClose={() => setIsAlertOpen(false)}
        isOpen={isAlertOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader> Enter Username:</AlertDialogHeader>
          <AlertDialogBody>
            <form onSubmit={handleUsernameSubmit}>
              <Input
                isRequired={true}
                maxW="sm"
                placeholder="username"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
              {alertDialogUser && (
                <Alert status="warning" w="sm" marginX="1.5" marginY="2">
                  <AlertIcon /> Username is required
                </Alert>
              )}
            </form>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              isDisabled={!username ? true : false}
              onClick={(e) => {
                handleUsernameSubmit(e);
              }}
              type="submit"
            >
              Submit
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
            Join Room
          </Heading>
          <Divider marginY="2" />
          <Heading textAlign="center" marginY="2">
            Create Room
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

        {rooms && <Rooms rooms={rooms} />}
      </Container>
    </>
  );
};

export default Home;
