import React, { useGlobal, useEffect, useState } from "reactn";
import { useParams } from "react-router-dom";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { io } from "socket.io-client";
const Room = () => {
  const [username] = useGlobal("username");
  const [connecting, setConnecting] = useState(true);
  const [socket, setSocket] = useGlobal("socket");
  const [data, setData] = useState({});
  const [subreddit, setSubreddit] = useState(
    "" || localStorage.getItem("subreddit")
  );
  const [messages, setMessages] = useGlobal("messages");
  let newArr = [];
  const { roomID } = useParams();

  useEffect(() => {
    const s = io("http://localhost:8000/");
    setSocket(s);
    return () => s.disconnect();
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
    socket.on("reqMeme", (data) => {
      setData(data);
    });
    socket.on("message", (req) => {
      newArr.push(req);
      setMessages(newArr);
    });
    socket.on("userJoined", (data) => {
      newArr.push(data);
      setMessages(newArr);
    });
    return () => {
      socket.off("userJoined");
    };
  }, [socket]);

  function reqMeme(e) {
    e.preventDefault();
    localStorage.setItem("subreddit", subreddit);
    socket.emit("reqMeme", subreddit);
  }

  return connecting ? (
    <h1>Connecting...</h1>
  ) : (
    <div>
      <input
        value={subreddit || ""}
        onChange={(e) => setSubreddit(e.target.value)}
      />
      <button onClick={reqMeme} type="onSubmit">
        Set subreddit
      </button>
      {data.error ? (
        <>
          <h1>Start by entering a valid subreddit</h1>
        </>
      ) : (
        <>
          <h1>
            <a
              href={`https://reddit.com/r/${data.subreddit}`}
              target="_blank"
              rel="noreferrer"
            >
              r/{data.subreddit}
            </a>
          </h1>
          <h1>
            <a
              href={`https://reddit.com/user/${data.author}`}
              target="_blank"
              rel="noreferrer"
            >
              u/{data.author}
            </a>
          </h1>
          <h1>{data.title}</h1>

          <a href={data.postLink} target="_blank" rel="noreferrer">
            <img src={data.img} alt={data.title} />
          </a>
          <p>ups:{data.ups}</p>
          <p>room ID: {roomID}</p>
          <p>your username: {username}</p>
        </>
      )}
      <div>
        <Messages />
        <MessageInput socket={socket} />
      </div>
    </div>
  );
};

export default Room;
