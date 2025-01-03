import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import authRedirectNoToken from "../components/ts/autRedirectNoToken";
import roleAdmin from "../components/ts/roleAdmin";
import { api } from "../components/ts/urls";

let socket: Socket; // Declarar el socket a nivel global para mantener la referencia.

function Chats() {

  authRedirectNoToken("/login");
  const navigate = useNavigate();
  useEffect(() => {
    roleAdmin(navigate);
  }, [navigate]);
 
  const [isConnected, setIsConnected] = useState(false); // Estado para controlar si estamos conectados.

  // Función para manejar la conexión al servidor WebSocket
  const handleConnect = () => {
    if (!isConnected) {
      socket = io(api); // Cambiar la URL por la del backend.
      
      socket.on("connect", () => {
        console.log("Conectado al servidor", socket.id);
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("Desconectado del servidor");
        setIsConnected(false);
      });
    }
  };

  // Función para desconectar manualmente (opcional)
  const handleDisconnect = () => {
    if (socket && isConnected) {
      socket.disconnect();
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Chats</h1>
      <button
        onClick={handleConnect}
        className={`px-4 py-2 rounded-lg text-white ${
          isConnected ? "bg-green-500" : "bg-blue-500"
        }`}
      >
        {isConnected ? "Conectado" : "Conectar"}
      </button>
      {isConnected && (
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 rounded-lg text-white bg-red-500 mt-4"
        >
          Desconectar
        </button>
      )}
    </div>
  );
}

export default Chats;

// const endExchange = () => {
//   alert("Intercambio terminado.");
// };

// const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// <div
//         className={`fixed md:relative z-20 h-full md:h-auto md:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-r from-gray-900 via-black to-gray-900 border-r flex flex-col ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } w-80`}
//       >
//         <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//           <h1 className="text-xl font-bold text-white">Chats</h1>
//           <button
//             className="md:hidden text-white"
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             ✕
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {[1, 2, 3, 4, 5].map((chat) => (
//             <div
//               key={chat}
//               className="flex items-center px-4 py-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700"
//             >
//               <div className="w-12 h-12 bg-gray-700 rounded-full mr-3"></div>
//               <div>
//                 <p className="text-sm font-medium text-white">Chat {chat}</p>
//                 <p className="text-xs text-gray-400 truncate">
//                   Last message...
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col">
//         <div className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700 flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
//             <div>
//               <p className="text-sm font-medium text-white">Chat Name</p>
//               <p className="text-xs text-gray-400">Online</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button
//               className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
//               onClick={endExchange}
//             >
//               Cerrar intercambio
//             </button>
//             <button
//               className="md:hidden text-white"
//               onClick={() => setIsSidebarOpen(true)}
//             >
//               ☰
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 p-4 overflow-y-auto bg-gray-800">
//           <div className="mb-4">
//             <div className="bg-gray-700 text-white rounded-lg p-3 max-w-sm">
//               Hello!
//             </div>
//             <p className="text-xs text-gray-400 mt-1">12:00 PM</p>
//           </div>
//           <div className="mb-4 text-right">
//             <div className="bg-gray-600 text-white rounded-lg p-3 max-w-sm ml-auto">
//               Hi there!
//             </div>
//             <p className="text-xs text-gray-400 mt-1">12:01 PM</p>
//           </div>
//         </div>

//         <div className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-700">
//           <div className="flex items-center">
//             <input
//               type="text"
//               className="flex-1 border rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-orange-600"
//               placeholder="Type a message..."
//             />
//             <button className="ml-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
//               Send
//             </button>
//           </div>
//         </div>
//       </div>

// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import authRedirectNoToken from "../components/ts/autRedirectNoToken";
// import roleAdmin from "../components/ts/roleAdmin";

// const socket = io("http://localhost:4001"); // Cambiar por tu backend URL

// type Message = {
//   senderId: number;
//   content: string;
//   createdAt: string;
// };

// function Chats() {
//   authRedirectNoToken("/login");

//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState("");
//   const [chatId, setChatId] = useState(1); // Cambiar según el ID del chat
//   const [senderId, setSenderId] = useState(1); // Cambiar según el ID del usuario logueado

//   useEffect(() => {
//     roleAdmin(navigate);

//     socket.emit("joinChat", { chatId });

//     socket.on("newMessage", (message: Message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [chatId, navigate]);

//   const sendMessage = () => {
//     if (inputValue.trim()) {
//       socket.emit("sendMessage", {
//         chatId,
//         senderId,
//         content: inputValue,
//       });
//       setInputValue("");
//     }
//   };

//   const endExchange = () => {
//     alert("Intercambio terminado.");
//   };

//   return (
//     <div className="h-screen flex flex-col md:flex-row bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed md:relative z-20 h-full md:h-auto md:translate-x-0 transform transition-transform duration-300 ease-in-out bg-gradient-to-r from-gray-900 via-black to-gray-900 border-r flex flex-col ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } w-80`}
//       >
//         <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//           <h1 className="text-xl font-bold text-white">Chats</h1>
//           <button
//             className="md:hidden text-white"
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             ✕
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {[1, 2, 3, 4, 5].map((chat) => (
//             <div
//               key={chat}
//               className="flex items-center px-4 py-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700"
//               onClick={() => setChatId(chat)}
//             >
//               <div className="w-12 h-12 bg-gray-700 rounded-full mr-3"></div>
//               <div>
//                 <p className="text-sm font-medium text-white">Chat {chat}</p>
//                 <p className="text-xs text-gray-400 truncate">
//                   Last message...
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col">
//         <div className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-gray-700 flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
//             <div>
//               <p className="text-sm font-medium text-white">Chat Name</p>
//               <p className="text-xs text-gray-400">Online</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button
//               className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
//               onClick={endExchange}
//             >
//               Cerrar intercambio
//             </button>
//             <button
//               className="md:hidden text-white"
//               onClick={() => setIsSidebarOpen(true)}
//             >
//               ☰
//             </button>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 p-4 overflow-y-auto bg-gray-800">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`mb-4 ${
//                 msg.senderId === senderId ? "text-right" : ""
//               }`}
//             >
//               <div
//                 className={`${
//                   msg.senderId === senderId
//                     ? "bg-gray-600 ml-auto"
//                     : "bg-gray-700"
//                 } text-white rounded-lg p-3 max-w-sm`}
//               >
//                 {msg.content}
//               </div>
//               <p className="text-xs text-gray-400 mt-1">
//                 {new Date(msg.createdAt).toLocaleTimeString()}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="p-4 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-700">
//           <div className="flex items-center">
//             <input
//               type="text"
//               className="flex-1 border rounded-lg px-3 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-orange-600"
//               placeholder="Type a message..."
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//             />
//             <button
//               className="ml-3 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
//               onClick={sendMessage}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Chats;
