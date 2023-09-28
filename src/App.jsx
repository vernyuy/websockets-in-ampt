import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Spinner, Button, Header } from "./components";
import "./App.css";

function App() {
  // const wsUrl = import.meta.env["VITE_AMPT_WS_URL"];
  const wsUrl = "wss://super-code-wsvor.ampt.app";
  const [messageHistory, setMessageHistory] = useState([]);
  const [processing, setProcessing] = useState(false);
  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      if (lastMessage.data.includes("Started Task")) {
        setProcessing(true);
      }

      if (lastMessage.data.includes("Task complete")) {
        setProcessing(false);
      }
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(
    () =>
      sendMessage(
        JSON.stringify({
          task: "start",
        })
      ),
    []
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <>
      <div className="App">
        <Header text={`WebSocket Status: ${connectionStatus}`} />
        <h1 className="text-3xl font-bold">Welcome to Ampt WebSockets!</h1>
        <div style={{ height: "30px" }} />
        <div style={{ flex: 1, flexDirection: "column" }}>
          {processing ? (
            <Spinner text="Processing..." />
          ) : (
            <Button
              text="Start Async Process"
              onPress={handleClickSendMessage}
            />
          )}
          <div style={{ height: "30px" }} />
          <h1 className="text-2xl font-bold underline">Received Messages</h1>
          {messageHistory.map((message, idx) => (
            <p key={idx} className="text-2xl ...">
              {message ? message.data : null}
            </p>
          ))}
        </div>
        <Header top={false} text={`Connected to ${wsUrl}`} />
      </div>
    </>
  );
}

export default App;
