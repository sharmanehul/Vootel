import {useDispatch, useSelector} from "react-redux"
import { selectConversation } from "../redux/conversationSlice";
import {ConversationShimmer} from "./Shimmer";import { useEffect, useState } from "react";
import useGetActiveConversation from "../hooks/useGetActiveConversation";

const Conversation = ({ searchQuery}) => {
	const dispatch = useDispatch()
	const {loading} = useGetActiveConversation()

	const {selectedConversation,activeConversation} = useSelector(state => state.conversation);
	const [filteredConversation,setFilteredConversation] = useState([])
	
	useEffect(() => {
		if(searchQuery){
			const filter = activeConversation.filter((user) => {
				return user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
			})
			setFilteredConversation(filter)
		}
		else{
			setFilteredConversation(activeConversation)
		}
	},[searchQuery,activeConversation])
	
	return loading ? (
			<ConversationShimmer/>
	) : ( filteredConversation?.length === 0 ? (
		<div className="text-center text-medium tracking-wider">Click + to add users</div>
	):(
		filteredConversation && filteredConversation.map((user) => (
			<div key={user._id} onClick={() => dispatch(selectConversation(user))}>
				<div className={`p-2 flex items-center gap-4 hover:bg-gray-400 hover:bg-opacity-10  cursor-pointer ${selectedConversation?._id === user._id && "bg-gray-400 bg-opacity-15 "}`}>
					<p className={`h-8 w-8 text-white rounded-full flex items-center justify-center bg-blue-500`}>{user?.fullName[0].toUpperCase()}</p>
					<div>
						<h3 className="text-g font-medium ">{user.fullName}</h3>
						<p className="text-xs text-gray-500">
							new message
						</p>
					</div>
				</div>
			</div>
		)))
	);
};

export default Conversation;