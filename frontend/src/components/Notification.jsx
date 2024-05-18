import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../utils/constant'
import { removeNotification, selectConversation } from '../redux/conversationSlice'

const Notification = ({notifications}) => {
    
    const allUsers = useSelector(state => state.conversation.allConversation)
    const dispatch = useDispatch()

    const handleMessageClick = (senderId) => {
        const user = getUser(senderId,allUsers)
        dispatch(selectConversation(user))
        dispatch(removeNotification(senderId))
    }

return (
    !notifications.length ? (
        <div>No new messages</div>
    ) : (
        notifications.map((msg) => (
            <div key={msg._id} className='p-2 cursor-pointer hover:font-medium ' onClick={() => handleMessageClick(msg.senderId)}>
                <p>New message from {getUser(msg?.senderId,allUsers)?.fullName}</p>
            </div>
        ))
    )  
)
}

export default Notification