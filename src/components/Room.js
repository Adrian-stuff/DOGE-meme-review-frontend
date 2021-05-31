import React, { useGlobal, useEffect, useState } from "reactn";
import { useParams, Link, Redirect } from "react-router-dom";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { io } from "socket.io-client";
import Meme from "./Meme";
import {
  Input,
  Box,
  Button,
  Spinner,
  Center,
  Flex,
  HStack,
  Text,
  Drawer,
  useMediaQuery,
  useDisclosure,
  Spacer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
} from "@chakra-ui/react";
import DarkModeButton from "./DarkModeButton";
const Room = () => {
  const [username] = useGlobal("username");
  const [connecting, setConnecting] = useState(true);
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState();
  const [subreddit, setSubreddit] = useState("");
  const [messages, setMessages] = useGlobal("messages");
  let newArr = [];
  const { roomID } = useParams();
  const [isLargerThan767] = useMediaQuery("(max-width: 764px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    let s = io("https://doge-meme-server.herokuapp.com/");
    // let s = io("http://localhost:8000/");
    setSocket(s);
    return () => {
      setMessages([]);
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on("connect", () => {
      setConnecting(false);
      socket.emit("joinRoom", { room: roomID, username: username }, (err) => {
        if (!err.success) {
          console.log(err.message);
        }
      });
    });
  }, [socket, roomID, username]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("reqMeme", (datas) => {
      console.log(datas);
      setSubreddit(datas !== undefined ? datas.subreddit : "");
      setData(datas);
    });
    socket.on("message", (req) => {
      newArr.push(req);
      console.log(newArr);
      setMessages(newArr);
    });
    socket.on("userJoined", (data) => {
      newArr.push(data);
      setMessages(newArr);
    });
    return () => {
      socket.off("userJoined");
    };
  }, [socket, setMessages]);

  function reqMeme(e) {
    e.preventDefault();
    socket.emit("reqMeme", subreddit);
  }
  if (username === undefined || "") return <Redirect to="/" />;

  return connecting ? (
    <Center marginY="10">
      <Text fontSize="4xl" marginX="5">
        Connecting...
      </Text>
      <Spinner size="xl" />
    </Center>
  ) : (
    <>
      <nav>
        <Flex
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          marginX="4"
        >
          {!isLargerThan767 && (
            <Link to="/">
              <Button size="sm">Go back</Button>
            </Link>
          )}
          <HStack>
            <Input
              value={subreddit || ""}
              onChange={(e) => setSubreddit(e.target.value)}
              placeholder="Subreddit"
              size="sm"
              width="200px"
              margin="1.5"
            />
            <Button
              position=""
              size="sm"
              variant="ghost"
              onClick={reqMeme}
              type="submit"
            >
              {data == null ? "Set subreddit" : "Request Meme"}
            </Button>
          </HStack>
          {!isLargerThan767 && (
            <DarkModeButton margin="2" variant="ghost" size="md" />
          )}
        </Flex>
      </nav>

      <HStack
        spacing={4}
        justifyContent="center"
        flexDirection={isLargerThan767 ? "column" : "row"}
      >
        <Spacer />
        <Meme data={data} media={isLargerThan767} onOpen={onOpen} />

        {isLargerThan767 ? (
          <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader fontSize="x-large">Chat</DrawerHeader>
              <DarkModeButton margin="2" variant="ghost" size="md" />

              <DrawerBody>
                <Messages messages={messages} />
                <MessageInput socket={socket} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        ) : (
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Messages messages={messages} />
            <MessageInput socket={socket} />
          </Box>
        )}
        <Spacer />
      </HStack>
    </>
  );
};

export default Room;
