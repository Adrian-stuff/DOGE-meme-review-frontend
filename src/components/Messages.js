import React from "reactn";
import { Flex, useColorMode } from "@chakra-ui/react";

const Messages = ({ messages }) => {
  // const [messages, setMessages] = useGlobal("messages");
  const { colorMode } = useColorMode();

  return (
    <Flex
      flexDirection="column"
      padding="2"
      h="512px"
      maxHeight="512px"
      maxW="260px"
      overflow="auto"
    >
      {messages.map((e, idx) => (
        <div key={idx}>
          <p>
            <span
              style={{ color: colorMode === "dark" ? "lightblue" : "blue" }}
            >
              {e.username}:
            </span>{" "}
            {e.message}
          </p>
        </div>
      ))}
    </Flex>
  );
};

export default Messages;
