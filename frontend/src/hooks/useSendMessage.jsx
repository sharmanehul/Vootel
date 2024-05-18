import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast"
import axios from "axios"
import {  addNewMessage } from "../redux/conversationSlice";
import { useSocket } from "../context/SocketContext";
import useGetActiveConversation from "./useGetActiveConversation";

const useSendMessage = () => {
    const selectedConversation = useSelector(state => state.conversation.selectedConversation)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const { socket } = useSocket();
    
    const {addNewConversation} = useGetActiveConversation()

    const sendMessage = async(message) => {
        setLoading(true)
        try{
            const response = await axios.post(`/message/${selectedConversation._id}`, {
                message: message 
            }, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('token'))
                }
            });
            const sendData = {
                message: response?.data?.message,
                chatId: response?.data?.message?.receiverId
            }
            socket.emit("new message",sendData)
            if(response.data){
                dispatch(addNewMessage(response?.data?.message))
                addNewConversation(selectedConversation)
            }
        }
        catch(error){
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }

    }

    const sendFile = async(file) => {
        try{
            const formData = new FormData()
            formData.append('file',file)
            const response = await axios.post(`/message/file/${selectedConversation._id}`, formData , {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('token'))
                }
            });

            // console.log(response.data)
        }
        catch(err){
            console.log("getting error in sending file",err)
        }
    }

    return {sendMessage,sendFile,loading}

};

export default useSendMessage;
