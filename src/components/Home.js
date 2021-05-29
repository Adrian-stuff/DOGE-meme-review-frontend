import { useHistory } from "react-router-dom";
import React, { useGlobal } from "reactn";

const Home = () => {
  const [roomID, setRoomID] = useGlobal("roomID");
  const [username, setUsername] = useGlobal("username");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("username", username);
    history.push(`/rooms/${roomID}`);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="roomID"
          value={roomID || ""}
          onChange={(e) => setRoomID(e.target.value)}
        />
        <button onClick={handleSubmit}>Enter</button>
      </form>
    </div>
  );
};

export default Home;
