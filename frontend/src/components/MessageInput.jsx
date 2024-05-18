import  { useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import Loader from "./Loader"
import useSendMessage from "../hooks/useSendMessage";
import { IoSend } from "react-icons/io5";


const MessageInput = () => {
	const [file,setFile] = useState(null)
    const [inputMessage,setInputMessage] = useState("")
    const {loading,sendMessage,sendFile} = useSendMessage()
	
	const handleFileChange = async (e) => {
		setFile(e.target.files[0])
		setInputMessage(`Send ${e.target?.files[0]?.name}`)
	}

    const handleSubmit = async(e) => {
		e.preventDefault()

        if(inputMessage === "" && !file){
            return
        }        
		if(file){
			await sendFile(file)
		}
		if(inputMessage){
			await sendMessage(inputMessage)
		}
		setFile(null)
		setInputMessage("")
	}

	
	return (
		<div className="mx-4 flex items-center  rounded-lg px-4 bg-gray-400 bg-opacity-15">
			<button className="inset-y-0 end-0" onClick={() => document.getElementById('file').click()}>
				<MdOutlineAttachFile />
			</button>
			<form className="w-full flex items-center px-2" onSubmit={handleSubmit}>
				<input type="file" id="file" className="hidden" onChange={handleFileChange}/>
				<input className=" py-3 w-full outline-none bg-transparent" placeholder="Send a message" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}
					type="text"
				/>
				<button className="inset-y-0 end-0">
					{loading ? <Loader/> : <IoSend />}
				</button>
			</form>
		</div>
	);
};

export default MessageInput;
