import { useEffect, useState } from "react";

function Chat() {
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState([]);

  const roomName = "hello";

  const sendMesageHandle = (e) => {
    e.preventDefault();
    let socketPath = "ws://" + window.location.host + "/ws/" + roomName;
    setMessage("");

    const chatSocket = new WebSocket(socketPath);
    console.log(socketPath);

    chatSocket.onopen = function () {
      chatSocket.send(
        JSON.stringify({
          room_name: roomName,
          message: message,
        })
      );
    };
  };

  useEffect(() => {
    let socketPath = "ws://" + window.location.host + "/ws/" + roomName;
    const chatSocket = new WebSocket(socketPath);

    chatSocket.onmessage = function (e) {
      console.log("onmessage", e);
      const data = JSON.parse(e.data);

      setMessageData((prev = []) => [
        ...prev,
        { message: data.message, created_at: data.create_at },
      ]);
    };
  }, [roomName]);

  return (
    <div>
      {message.map((item, i) => {
        return (
          <div key={i} id="message" className="card">
            <div className="cell large-4">{item.text}</div>
            <div className="cell large-2 text-right">
              <small>{item.date}</small>
            </div>
          </div>
        );
      })}

      <textarea id="chat-message-input" type="text" cols="100" />
      <br />
      <input
        id="chat-message-submit"
        type="button"
        className="button"
        value="Send"
        onSubmit={sendMesageHandle}
      />
    </div>
  );
}

export default Chat;
