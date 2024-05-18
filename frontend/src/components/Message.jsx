import { useSelector } from "react-redux"
import { extractTime } from "../utils/constant"

const Messages = ({message}) => {
  const user = useSelector(state => state?.user?.userData)
  const selectedConversation = useSelector(state => state?.conversation?.selectedConversation)
  const myMessage = user?._id === message?.senderId
  const formattedTime = extractTime(message?.createdAt);
  const chatDirection = myMessage ? "chat-end" : "chat-start"
  const bubbleBgColor = myMessage ? "bg-blue-500" : "";
  // const shakeClass = message.shouldShake ? "shake" : "";
  const profilePic = myMessage ? user?.fullName[0].toUpperCase() : selectedConversation?.fullName[0].toUpperCase()
  return (
    <div className='py-1'>
        <div className={`chat ${chatDirection}`}>
            <div className='chat-image avatar'>
              <p className="h-8 w-8 text-white bg-green-500 rounded-full flex items-center justify-center"> {profilePic} </p>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message?.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    </div>
  )
}

export default Messages