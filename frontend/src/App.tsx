import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([""]);
  const [inputVal, setInputVal] = useState("");
  const wsRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
    wsRef.current = ws;

    ws.onopen = () =>
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            room: "red",
          },
        })
      );
  }, []);

  return (
    <div className="h-screen bg-black p-10">
      <div className="h-[80vh]">
        {messages.map((message, idx) => (
          <div key={idx} className="flex flex-col">
            <p className="bg-white text-black rounded p-3 m-2 w-fit border border-black">
              {message}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full bg-white flex rounded-xl h-10">
        <input
          type="text"
          className="flex-1 p-4"
          onChange={(e) => setInputVal(e.target.value)}
          value={inputVal}
        />
        <button
          onClick={() => {
            wsRef.current.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message: inputVal,
                },
              })
            );
          }}
          className="bg-purple-600 text-white px-6 rounded-xl text-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
