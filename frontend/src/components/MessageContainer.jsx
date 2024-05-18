import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { CaptalizeFirstLetter } from "../utils/constant";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useEffect} from "react";
import { addNewMessage, addNotification} from "../redux/conversationSlice";
import { useSocket } from "../context/SocketContext";
import MessageHeader from "./MessageHeader";
import notificaitonSound from "../assets/sound/notification.mp3"

const MessageContainer = () => {
	const { socket, selectedChatCompare} = useSocket();

	const {selectedConversation} = useSelector((state) => state.conversation);
	const {userData} = useSelector((state) => state.user);
	const dispatch = useDispatch()

	useEffect(() => {
		function handleMessageReceived(message){
			// console.log(selectedConversation,selectedChatCompare, message)
			if(!selectedChatCompare || selectedChatCompare !== message.senderId){
				const sound = new Audio(notificaitonSound)
				sound.play()
				dispatch(addNotification(message))
				// console.log("send notification")
			}
			else{
				dispatch(addNewMessage(message))
				// console.log("dispatchedd..")
			}
		}
		socket.on("message received",handleMessageReceived)
		return () => {
			socket.off("message received", handleMessageReceived);
		};
	})
	
	return !selectedConversation ? (
		<div className="flex flex-col gap-4 items-center justify-center h-screen">
			<h1 className="text-2xl pb-2">Welcome {CaptalizeFirstLetter(userData?.fullName)} !!</h1>
			<h3 className="text-xl tracking-wide">
				Select a chat to start messaging
			</h3>
			<span className="text-4xl">
				<IoChatboxEllipsesOutline />
			</span>
		</div>
	) : (
		<div className="py-2 h-screen flex flex-col justify-between">
			<MessageHeader/>

			<Messages />
			
			<MessageInput socket = {socket} selectedChatCompare = {selectedChatCompare}/>
			
		</div>
	);
};

export default MessageContainer;