import MessageContainer from './MessageContainer'
import SideBar from './SideBar'
import { useSelector } from "react-redux";
import SideMenu from './SideMenu';
const Chat = () => {

  const theme = useSelector((state) => state.user.theme);
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation)

  return (
    <div className='sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 max-h-screen ' data-theme = {theme}>
        <div className={`col-span-2 border-r border-gray-400 flex ${selectedConversation && "hidden sm:flex"}`}>
            <SideMenu/>
            <SideBar/>
        </div>
        <div className={`${selectedConversation ? "block" : "hidden"} sm:block sm:col-span-2 md:col-span-4 lg:col-span-6`}>
            <MessageContainer/>
        </div>
    </div>
  )
}

export default Chat