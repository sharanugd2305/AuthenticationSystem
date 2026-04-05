import React from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext.jsx';
import axios from 'axios'
import { useContext } from 'react';
function SignUp() {
    const [showPassword ,setShowPassword] = useState(false);
    const {serverUrl}=useContext(userDataContext)
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [loading,setLoading]=useState(false)
    const [password,setPassword]=useState("")
     const [err,setErr]=useState("")
    const handleSignUp = async (e) => {
    e.preventDefault()
      setErr("")
       setLoading(true)
    try{
      let result =await axios.post(`${serverUrl}/api/auth/signup`,
        {name,email,password},
        {withCredentials:true})
        console.log(result.data)
         setLoading(false)

    }catch(error){
      console.log(error)
       setLoading(false)
      setErr(error.response.data.message)

    }
  }
  return (
<div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#384959]">
  <div className="absolute inset-0 bg-[linear-gradient(135deg,#6A89A7,#BDDDDC,#88BDF2)]" />

  <div
    className="relative z-10 w-full max-w-md rounded-2xl
    border border-white/30
    bg-white/15 backdrop-blur-xl
    p-10 shadow-xl"
  >
    <form className="w-[90%] h-150 max-w-125 flex flex-col items-center justify-center gap-5" onSubmit={handleSignUp}>
      <h1 className="text-blue-900 text-2xl font-semibold mb-7.5">
        Create An Account
      </h1>
      <input type="text" placeholder='Enter your Name' className='w-full h-15 outline-none border-2 border-blue-900 bg-transparent
        text-black placeholder-black-300 px-5 py-2.5 rounded-full text-[18px]' required onChange={(e)=>setName(e.target.value)} value={name} />
         <input type="email" placeholder=' Email' className='w-full h-15 outline-none border-2 border-blue-900 bg-transparent
        text-black placeholder-black-300 px-5 py-2.5 rounded-full text-[18px]' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <div className='w-full h-15 border-2 border-blue-900 bg-transparent
        text-black rounded-full text-[18px] relative'>
            <input type={showPassword?"text":"password"} placeholder='password' className='w-full h-full rounded-full outline-none bg-transparent 
           placeholder-black-300 px-5 py-2.5 ' required onChange={(e)=>setPassword(e.target.value)} value={password} />
            {!showPassword &&
           <IoEye className='absolute top-4.5 right-5 w-6.25 h-6.25 text-white cursor-pointer' onClick={()=>setShowPassword(true)}/>}
             {showPassword &&
           <IoEyeOff  className='absolute top-4.5 right-5 w-6.25 h-6.25 text-white cursor-pointer' onClick={()=>setShowPassword(false)}/>}
          </div>
          {err.length>0 && <p className='text-red-500 text-[17px]'>
          *{err}
          </p>}
           <button className='min-w-37.5 h-15 mt-7.5 text-black font-semibold text-[19px] bg-white rounded-full ' 
            disabled={loading}>{loading?"Loading...":"Sign Up"}</button>
           <p className='text-black text-[18px] cursor-pointer' onClick={()=>navigate('/signin')}>
            Already have an account ? <span className='text-blue-400'>Sign In</span></p>
    </form>
  </div>
</div>

  )
}

export default SignUp
