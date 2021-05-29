import React, { useGlobal } from "reactn";

const Messages = () => {
  const [messages, setMessages] = useGlobal("messages");
  return (
    <div>
      {messages.map((e, idx) => (
        <div key={idx}>
          <h1>{e.username}</h1>
          <h1>{e.message}</h1>
        </div>
      ))}
    </div>
  );
};

export default Messages;
