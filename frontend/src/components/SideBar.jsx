import { IoSearchOutline } from "react-icons/io5";
import useGetConversation from "../hooks/useGetConversation";
import Conversation from "./Conversation";
import { useSelector} from "react-redux"
import { useEffect, useRef, useState } from "react";
import AllConversation from "./AllConversation";
import { RxCross2 } from "react-icons/rx";
const SideBar = () => {
    const theme = useSelector(state => state.user.theme)
    const [showAllUsers,setShowAllUsers] = useState(false)
    const [searchQuery,setSearchQuery] = useState('') 
    
    const {load,allConversation} = useGetConversation()

    const containerRef = useRef(null);
    useEffect(() => {
      
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setShowAllUsers(!setShowAllUsers);
        }
    };
      if (showAllUsers) {
          document.addEventListener('click', handleClickOutside);
      }
      return () => {
          document.removeEventListener('click', handleClickOutside);
      };
  }, [showAllUsers]);

  return (
    <div className='p-4 max-h-screen rounded-lg shadow-lg overflow-auto w-full'>
        <div className='flex items-center w-full rounded-lg mb-4' data-theme={theme === 'dark' ? 'dim':'nord'}>
            <span className='px-3'><IoSearchOutline /></span>
            <input className='outline-none py-2 px-1 bg-transparent w-full' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type='text' placeholder='Search'/>
            <p  ref={containerRef} className="cursor-pointer text-2xl px-4 pb-1 hover:opacity-60" onClick={() => setShowAllUsers(!showAllUsers)}>+</p>
        </div>
        { searchQuery &&  <div className="flex justify-between items-center px-4 pb-2">
            <p>search for: {searchQuery}</p>
            <span className="pr-2 hover:opacity-60 cursor-pointer" onClick={() => setSearchQuery('')}><RxCross2 /></span>
        </div> }  
        {
            showAllUsers && (
              <div className="fixed inset-0 bg-black bg-opacity-80 z-50 p-4 max-h-screen overflow-auto">
                <h3 className="text-violet-100 text-xl font-medium text-center pl-10 fixed top-5">All Users</h3>
                <div className="bg- rounded-lg shadow-lg max-w-md mx-auto mt-12 p-2  flex-1" data-theme={theme !== 'dark' ? 'dim':'nord'}>
                  <AllConversation load = {load} allConversation={allConversation} showAllUsers = {showAllUsers} setShowAllUsers = {setShowAllUsers}/>
                </div>
              </div>
        )}

        <div className="h-screen flex-1">
            <Conversation searchQuery= {searchQuery}/>
        </div>
    </div>
  )
}

export default SideBar