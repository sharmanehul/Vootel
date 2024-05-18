import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addActiveConversation } from "../redux/conversationSlice";

const useGetActiveConversation = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch()
	const {activeConversation} = useSelector(state => state.conversation)
	const getConversation = async() => {
		setLoading(true);
		try {
			const response =await axios.get("/users/active",{
				withCredentials:true,
				headers:{
					Authorization:JSON.parse(localStorage.getItem('token'))
				}
			});
			
			if (response.error) {
				throw new Error(response.error);
			}
			dispatch(addActiveConversation(response?.data?.users))
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
        getConversation()
	}, []);

	const addNewConversation = (newUser) => {
        const userExists = activeConversation.some(user => user._id === newUser._id);
        if (!userExists) {
			getConversation()
        }
    };
	return {loading,addNewConversation};
};

export default useGetActiveConversation;
