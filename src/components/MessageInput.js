import React, { useState, useGlobal } from "reactn";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
const MessageInput = ({ socket }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [username] = useGlobal("username");
  function handleSubmit(e) {
    e.preventDefault();
    let filteredMessage = inputMessage.replace(/\s/g, "");
    if (inputMessage === undefined || filteredMessage === "") return;
    socket.emit("message", {
      username: username,
      message: inputMessage,
    });
    setInputMessage("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputGroup size="md">
          <Input
            placeholder="message"
            pr="4.5rem"
            value={inputMessage || ""}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleSubmit}>
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </div>
  );
};

export default MessageInput;
