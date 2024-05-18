export const ConversationShimmer = () => {
	return (
		<div className="animate-pulse">
			<div className="p-2 flex  items-center gap-4  hover:bg-opacity-10 ">
				<p className="h-8 w-8 text-white bg-gray-200  rounded-full flex items-center justify-center">
				</p>
				<div>
					<h3 className="h-3 w-20 rounded mb-1 bg-gray-200 "></h3>
					<p className="h-3 w-40 rounded pb-2 bg-gray-200 "></p>
				</div>
			</div>
			<div className="p-2 flex  items-center gap-4  hover:bg-opacity-10 ">
				<p className="h-8 w-8 text-white bg-gray-200  rounded-full flex items-center justify-center">
				</p>
				<div>
					<h3 className="h-3 w-20 rounded mb-1 bg-gray-200 "></h3>
					<p className="h-3 w-40 rounded pb-2 bg-gray-200 "></p>
				</div>
			</div>
			<div className="p-2 flex  items-center gap-4  hover:bg-opacity-10 ">
				<p className="h-8 w-8 text-white bg-gray-200  rounded-full flex items-center justify-center">
				</p>
				<div>
					<h3 className="h-3 w-20 rounded mb-1 bg-gray-200 "></h3>
					<p className="h-3 w-40 rounded pb-2 bg-gray-200 "></p>
				</div>
			</div>
			<div className="p-2 flex  items-center gap-4  hover:bg-opacity-10 ">
				<p className="h-8 w-8 text-white bg-gray-200  rounded-full flex items-center justify-center">
				</p>
				<div>
					<h3 className="h-3 w-20 rounded mb-1 bg-gray-200 "></h3>
					<p className="h-3 w-40 rounded pb-2 bg-gray-200 "></p>
				</div>
			</div>
			<div className="p-2 flex  items-center gap-4  hover:bg-opacity-10 ">
				<p className="h-8 w-8 text-white bg-gray-200  rounded-full flex items-center justify-center">
				</p>
				<div>
					<h3 className="h-3 w-20 rounded mb-1 bg-gray-200 "></h3>
					<p className="h-3 w-40 rounded pb-2 bg-gray-200 "></p>
				</div>
			</div>
			<div className="p-2 flex  items-center gap-4  hover:bg-opacity-10 ">
				<p className="h-8 w-8 text-white bg-gray-200  rounded-full flex items-center justify-center">
				</p>
				<div>
					<h3 className="h-3 w-20 rounded mb-1 bg-gray-200 "></h3>
					<p className="h-3 w-40 rounded pb-2 bg-gray-200 "></p>
				</div>
			</div>
		</div>
	);
};


export const MessageShimmer = () => {
	return (
		<>
			<div className='flex gap-3 items-center'>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
					<div className='skeleton h-4 w-40'></div>
				</div>
			</div>
			<div className='flex gap-3 items-center justify-end'>
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
				</div>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
			</div>
		</>
	);
};
export default MessageShimmer;