import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import "./Chat.css";
function Chat() {
  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const db = getDatabase();
  const chatListRef = ref(db, "chats");
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const getCurrentTime = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${day}/${month}/${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        setUser({ name: result.user.displayName, email: result.user.email });
      })
      .catch((error) => {
        setError(error);
      });
  };
  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };
  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
  }, []);
  const sendChat = () => {
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg,
      time:getCurrentTime(),
    });
    setMsg("");
  };

  return (
    <>
      {error.length > 2 ? (
        <div>{error}</div>
      ) : (
        <div className="main-container">
          {!user.email ? null : (
            <div className="google-signin">
              <Button variant="outlined" onClick={() => googleLogin()}>
                Sign in With Google
              </Button>
            </div>
          )}
          {!user.email ? (
            <div>
              <h3>User: {user.name}</h3>
              <div id="chat" className="chat-container">
                {chats.map((c, i) => (
                  <div
                    key={i}
                    className={`container ${
                      c.user.email === user.email ? "me" : ""
                    }`}
                  >
                    <p className="chatbox">
                      <strong>
                        {c.user.name} ({c.time}) :
                      </strong>
                      <span>{c.message}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="btm">
                <TextField
                  label="Type your message"
                  fullWidth
                  variant="outlined"
                  onInput={(e) => setMsg(e.target.value)}
                />
                <Button variant="contained" onClick={(e) => sendChat()}>
                  Send
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Chat;
