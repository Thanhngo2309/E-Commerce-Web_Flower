import { useState } from "react";
import axios from "axios";

export default function FlowerChatbot() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMsg = { role: "user", text: message };

    setChat(prev => [...prev, userMsg]);

    try {

      const res = await axios.post(
        "http://localhost:8000/api/ai/chat",
        { message }
      );

      const botMsg = {
        role: "ai",
        text: res.data.reply
      };

      setChat(prev => [...prev, botMsg]);

    } catch (error) {

      setChat(prev => [
        ...prev,
        { role: "ai", text: "AI đang gặp lỗi 😢" }
      ]);

    }

    setMessage("");

  };

  return (

    <div className="fixed bottom-5 right-5 w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col">

      {/* Header */}
      <div className="bg-green-500 text-white p-3 rounded-t-xl font-semibold">
        🌸 Flower AI Assistant
      </div>

      {/* Chat */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2">

        {chat.map((c, i) => (

          <div
            key={i}
            className={`flex ${c.role === "user" ? "justify-end" : "justify-start"}`}
          >

            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
                c.role === "user"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {c.text}
            </div>

          </div>

        ))}

      </div>

      {/* Input */}
      <div className="p-2 border-t flex gap-2">

        <input
          className="flex-1 border rounded-lg px-2 py-1 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hỏi về hoa..."
          onKeyDown={(e)=> e.key==="Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-3 rounded-lg text-sm"
        >
          Gửi
        </button>

      </div>

    </div>
  );
}
