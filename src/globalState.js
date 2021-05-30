import { setGlobal } from "reactn";

const globalState = () => {
  setGlobal({
    roomId: "",
    username: localStorage.getItem("username") || undefined,
    messages: [],
    socket: null,
  });
};
export default globalState;
