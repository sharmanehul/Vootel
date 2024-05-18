import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import {  clearMessages, removeActiveConversation, selectConversation } from "../redux/conversationSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useSocket } from "../context/SocketContext";
const MessageHeader = () => {
    const [showDropDown,setShowDropDown] = useState(false)
	const dropDownRef = useRef(null)
	const { onlineUsers, setSelectedChatCompare} = useSocket();

    const selectedConversation = useSelector(
		(state) => state.conversation?.selectedConversation
	);

    const {theme} = useSelector((state) => state.user);
	const dispatch = useDispatch()

	const handleDeleteMessages = async () => {
		
		const confirmed = window.confirm("Are you sure you want to delete this chat? This action cannot be undone.");
		if(!confirmed){
			return
		}
		try{
			const response = await axios.delete(`/message/${selectedConversation._id}`,{
				withCredentials:true,
				headers:{
					Authorization:JSON.parse(localStorage.getItem('token'))
				}
			})

			if(response.data){
				dispatch(clearMessages())
				dispatch(removeActiveConversation(selectedConversation._id))
				toast.success(response.data.message)
			}
		}	
		catch(error){
			console.log("error in deleting messages",error)
			toast.error("Messages not found")
		}
	}

    useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
				setShowDropDown(!setShowDropDown);
			}
		};
		if (showDropDown) {
			document.addEventListener('click', handleClickOutside);
		}
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [showDropDown]);

	const handleChatCross = () => {
		dispatch(selectConversation(null))
		setSelectedChatCompare(null)
	}	
	
	const userStatus = () => {
		return onlineUsers?.includes(selectedConversation._id)
	}

  return (
    <div className="py-2 px-4 rounded flex gap-4 items-center justify-between" data-theme={theme === "dark" ? "dim" : "nord"}>
				<div className="flex items-center gap-4">
					<p className="h-8 w-8 text-white bg-blue-400 bg-opacity-90 rounded-full flex items-center justify-center">
						{" "}
						{selectedConversation?.fullName[0].toUpperCase()}{" "}
					</p>
					<div>
						<h3 className=" font-medium ">
							{selectedConversation?.fullName}{" "}
						</h3>
						{userStatus() ? 
							(<p className="text-xs text-green-600">online</p>) :
							(<p className="text-xs text-gray-500">offline</p>)}
					</div>
				</div>
				<div className="relative flex gap-2 pr-2">
					<div className="text-lg cursor-pointer hover:opacity-60" onClick={handleChatCross}>
						<RxCross2/>
					</div>

					<div ref={dropDownRef} className="text-lg cursor-pointer hover:opacity-60" onClick={() => setShowDropDown(!showDropDown)}>
						<HiOutlineDotsVertical />
					</div>

					{showDropDown && <div className="absolute right-0 z-10 mt-10 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1" >
						<div className="py-1" role="none">
							<button className="text-gray-700 block px-4 py-2 text-sm hover:text-black" onClick={handleDeleteMessages}>Delete Chat</button>
						</div>
					</div>}
				</div>
			</div>
  )
}

export default MessageHeader