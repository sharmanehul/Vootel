import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux"
import {addAllConversation} from "../redux/conversationSlice"
import { useSocket } from "../context/SocketContext";
const useGetConversation = () => {
	const [allConversation, setAllConversation] = useState([]);
	const [load, setLoad] = useState(false);
	const dispatch = useDispatch()
	const {socket} = useSocket()

	const getAllConversation = async() => {
		setLoad(true);
		try {
			const response =await axios.get("/users",{
				withCredentials:true,
				headers:{
					Authorization:JSON.parse(localStorage.getItem('token'))
				}
			});
			
			if (response.error) {
				throw new Error(response.error);
			}
			setAllConversation(response.data.users);
			dispatch(addAllConversation(response.data.users))
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setLoad(false);
		}
	};
	useEffect(() => {
        getAllConversation()
	}, []);
	
	useEffect(() => {
		if(socket){
			socket.on("user added",() => {
				getAllConversation()
			})
		}
	})

	return {load,allConversation};
};

export default useGetConversation;
