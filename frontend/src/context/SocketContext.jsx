import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { BASEURL } from "../utils/constant";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
	const [socket,setSocket] = useState()
	const [selectedChatCompare, setSelectedChatCompare] = useState(null);
	const [socketConnected, setSocketConnected] = useState(false);
	const { userData } = useSelector((state) => state.user);
	const [onlineUsers,setOnlineUsers] = useState([])

	if (!socket) {
        setSocket(io(`${BASEURL}`))
    }

	useEffect(() => {
		if (userData) {
			socket.emit("setup", userData);
			const handleConnected = () => {
				setSocketConnected(true);
			};
			const handleDisconnect = () => {
				setSocketConnected(false);
			};
			const handleOnlineUsers = (users) => {
				setOnlineUsers(users)
			}
			socket.on("connected", handleConnected);
			
			socket.on('getonlineusers',handleOnlineUsers)

			socket.on("disconnect", handleDisconnect);
	
			return () => {
				socket.off("connected", handleConnected);
				socket.off("disconnect", handleDisconnect);
				socket.off("getonlineusers",handleOnlineUsers)
			};
		}
	}, [userData]);

	return (
		<SocketContext.Provider
			value={{
				socket,
				setSocket,
				selectedChatCompare,
				setSelectedChatCompare,
				socketConnected,
				onlineUsers
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};
