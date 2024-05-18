import  { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import axios from "axios"
import {clearMessages, setMessages} from "../redux/conversationSlice"
import { useSocket } from '../context/SocketContext'
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const [loading,setLoading] = useState(false)
    const { socket,setSelectedChatCompare} = useSocket();
    const {selectedConversation,messages} = useSelector(state => state.conversation)
    const dispatch = useDispatch()
    useEffect(() => {
        const getMessages = async() => {
            try{
                setLoading(true)
                const response = await axios.get(
                    `/message/${selectedConversation._id}`,
                    {
                        headers: {
                            Authorization: JSON.parse(
                                localStorage.getItem("token")
                            ),
                        },
                    }
                );  
                
                if(response.data?.length !== 0){
                    dispatch(setMessages(response?.data))
                }
                else dispatch(clearMessages())
                socket.emit("join chat",selectedConversation._id)
            }catch(error){
                console.log("getting error while fetching messages",error)
                toast.error(error.message)
            }
            finally{
                setLoading(false)
            }
        }

        if(selectedConversation){
            getMessages()
            setSelectedChatCompare(selectedConversation._id)
        }
    },[selectedConversation,socket,dispatch])

    return {loading,messages}
}

export default useGetMessages