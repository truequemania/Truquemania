import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { api } from "../components/ts/urls";

let socket: Socket;

type Message = {
  senderId: number;
  content: string;
  createdAt: string;
};

type Chat = {
  id: number;
  name: string;
};

function Chats() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [chatId, setChatId] = useState<number | null>(null); // Estado para chatId
  const [isConnected, setIsConnected] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]); // Lista de chats

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Leer los parámetros de la URL
    const userIdFromUrl = searchParams.get("userId");
    const receiverIdFromUrl = searchParams.get("receiverId");
    const chatIdFromUrl = searchParams.get("chatId");

    if (userIdFromUrl && receiverIdFromUrl && chatIdFromUrl) {
      const parsedChatId = Number(chatIdFromUrl);
      setUserId(Number(userIdFromUrl));
      setReceiverId(Number(receiverIdFromUrl));
      setChatId(parsedChatId);

      // Agregar chatId dinámicamente a la lista de chats
      setChats((prevChats) => {
        // Verificar si el chat ya existe
        if (!prevChats.some((chat) => chat.id === parsedChatId)) {
          return [
            ...prevChats,
            { id: parsedChatId, name: `Chat ${parsedChatId}` },
          ];
        }
        return prevChats;
      });

      connectToServer(
        Number(userIdFromUrl),
        Number(receiverIdFromUrl),
        parsedChatId
      );
    }
  }, [searchParams]);

  const connectToServer = (
    userId: number,
    receiverId: number,
    chatId: number
  ) => {
    if (!isConnected && userId !== null) {
      if (!socket || !socket.connected) {
        socket = io(api); // URL de tu backend
      }

      socket.off("connect");
      socket.off("disconnect");
      socket.off("receiveMessage");

      socket.on("connect", () => {
        console.log(`Conectado como ${userId} en el chat ${chatId}`);
        setIsConnected(true);
        setIsChatActive(true);
        socket.emit("joinRoom", { userId, chatId });
      });

      socket.on("disconnect", () => {
        console.log("Desconectado del servidor");
        setIsConnected(false);
        setIsChatActive(false);
      });

      socket.on("receiveMessage", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });
    }
  };

  const sendMessage = () => {
    if (inputValue.trim() && receiverId !== null && chatId !== null) {
      socket.emit("sendMessage", {
        senderId: userId,
        receiverId,
        chatId,
        content: inputValue,
      });
      setMessages((prev) => [
        ...prev,
        {
          senderId: userId!,
          content: inputValue,
          createdAt: new Date().toISOString(),
        },
      ]);
      setInputValue("");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Menú lateral */}
      <div
        className={`fixed md:relative z-40 h-full md:h-auto md:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-r from-gray-900 via-black to-gray-900 border-r flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-80`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Chats</h1>
          <button
            className="md:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center px-4 py-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700"
              onClick={() => setReceiverId(chat.id)}
            >
              <div className="w-12 h-12 bg-gray-700 rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-white">
                  Chat {chat.id}: {userId} de {receiverId}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  Último mensaje...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-white">Chat</p>
              <p className="text-xs text-gray-400">
                {isConnected ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        {isChatActive ? (
          <div className="flex-1 p-4 overflow-y-auto bg-gray-800">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.senderId === userId ? "text-right" : ""
                }`}
              >
                <div
                  className={`${
                    msg.senderId === userId
                      ? "bg-gray-600 ml-auto"
                      : "bg-gray-700"
                  } text-white rounded-lg p-3 max-w-sm`}
                >
                  {msg.content}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 p-4 flex items-center justify-center bg-gray-800">
            <div className="text-white text-center">
              <p className="text-lg">Esperando IDs...</p>
            </div>
          </div>
        )}

        {isChatActive && (
          <div className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-700">
            <div className="flex items-center">
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-orange-600"
                placeholder="Escribe un mensaje..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="ml-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                onClick={sendMessage}
              >
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chats;
