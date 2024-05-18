import Body from "./components/Body";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector(state => state.user.userData)

	return (
		<BrowserRouter>
			<div>
        <Routes>
          <Route path="/" element = {user ? <Navigate to="/chat"/>  : <Body/>} />
          <Route path="/chat" element={!user ? <Navigate to = "/"/>: <Chat/>}/>
          <Route path="/login" element={ user ? <Navigate to="/"/> : <Login/>}/>
          <Route path="/signup" element={ user ? <Navigate to="/"/> : <Signup/>}/>
        </Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
