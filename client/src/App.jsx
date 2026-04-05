import { useContext } from 'react'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import { Route, Routes} from 'react-router-dom'
import { userDataContext } from './context/UserContext.jsx'
import { Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx'


function App() {
  const {userData} = useContext(userDataContext);
  return (
    <>
     <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to={"/signin"} />} />
        <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
    </Routes> 
    </>
  )
}

export default App
