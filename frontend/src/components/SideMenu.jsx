import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/favicon.png"
import { IoLogOutOutline, IoNotificationsOutline } from "react-icons/io5";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { addUser, userTheme } from "../redux/userSlice";
import toast from "react-hot-toast"
import { MdOutlineColorLens } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import Notification from "./Notification";
import { useSocket } from "../context/SocketContext";

const SideMenu = () => {
    const NotificationRef = useRef(null)
    const notifications = useSelector(state => state.conversation.notifications)
    const [showNotification,setShowNotication]  = useState(false)
    const {theme,userData} = useSelector((state) => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {socket,setSocket} = useSocket()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (NotificationRef.current && !NotificationRef.current.contains(event.target)) {
                setShowNotication(!showNotification);
            }
        };
          if (showNotification) {
              document.addEventListener('click', handleClickOutside);
          }
          return () => {
              document.removeEventListener('click', handleClickOutside);
          };
    },[showNotification])

    const handleTheme = async () => {
        if(theme === "dark"){
            dispatch(userTheme("light"))
        }
        else dispatch(userTheme("dark"))
    }

    const handleLogout = async() => {
        try{    
            const response = await axios.post("/user/logout",)

            if(response.data){
                toast.success("Logout successfully")
            }
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            dispatch(addUser(null))
            navigate("/")
            if(socket){
                socket.disconnect();
                setSocket(null)
            }
        }catch(error){
            console.log(error)
        }
    }
	return (
		<div className="w-14 flex flex-col items-center justify-between h-screen py-4" data-theme={theme === "dark" ? "dim" : "nord"}>
			<div>
				<img className="h-12" src={Logo} alt="logo"/>
			</div>
			<div className="flex flex-col items-center gap-3">
            <div>
                <div className="relative inline-block cursor-pointer" onClick={() => setShowNotication(!showNotification)}>
                    <span ref = {NotificationRef} className="text-2xl hover:opacity-60"><IoNotificationsOutline /></span>
                        {notifications.length > 0 && (
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-700 text-white p-1">    
                                
                            </span>
                        )}
                    </div>
                    {
                        showNotification && <div className="fixed inset-0 bg-black bg-opacity-80 z-50 p-4 max-h-screen overflow-auto">
                            <h3 className="text-violet-100 text-xl font-medium text-center pl-10 fixed top-5">Notifications</h3>
                            <div className=" rounded-lg shadow-lg max-w-sm mx-auto mt-12 p-2 flex-1" data-theme={theme !== 'dark' ? 'dim':'nord'}>
                                    <Notification notifications={notifications}/>
                            </div>
                    </div>
                    }
                </div>
                <span className="text-2xl hover:opacity-60 cursor-pointer" onClick={handleTheme}><MdOutlineColorLens /></span>
                <span className="text-2xl hover:opacity-60 cursor-pointer" onClick={handleLogout}><IoLogOutOutline /></span>
                <div onClick={() => toast.success(`Hello ${userData.fullName}`,{icon: '👏',})}>
                    <p className="h-8 w-8 text-white bg-blue-500 rounded-full flex items-center justify-center cursor-pointer" >
                        {userData?.fullName[0].toUpperCase()}
                    </p>
                </div>
			</div>
		</div>
	);
};
export default SideMenu;