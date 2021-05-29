import React, { useState, useGlobal } from "reactn";

const MessageInput = ({ socket }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [username] = useGlobal("username");
  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("message", {
      username: username,
      message: inputMessage,
    });
    setInputMessage("");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="message"
          value={inputMessage || ""}
          onChange={(e) => setInputMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

export default MessageInput;
