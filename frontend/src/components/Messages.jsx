import { useEffect, useRef } from "react";
import useGetMessages from "../hooks/useGetMessages";
import Message from "./Message";
import MessageShimmer from "./Shimmer";

const Messages = ({socket}) => {
	const { loading, messages } = useGetMessages(socket);
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);
	return (
		<div className="px-4 py-1 min-h-[570px] flex-1 overflow-auto">
			{loading && (
				<div className="flex flex-col gap-10 py-5">
					<MessageShimmer />
					<MessageShimmer />
				</div>
			)}
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message?._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
		</div>
	);
};

export default Messages;
