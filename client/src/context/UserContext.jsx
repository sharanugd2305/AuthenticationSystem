import React, {createContext, useState,useEffect} from 'react'
import axios from 'axios'
export const userDataContext=createContext()
function UserContext({children}) {
    const serverUrl="http://localhost:8000"
    const [userData, setUserData] = useState(null)
     useEffect(() => {
    const handleCurrentUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        setUserData(result.data);
        console.log("Current User Data:", result.data);
      } catch (error) {
        console.error("Error fetching current user data:", error);
      }
    };
    
    handleCurrentUser();
  }, [serverUrl, setUserData]);
    const  value={
        serverUrl,
        userData,
        setUserData
    }
    return (
        <div>
            <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
        </div>
    )
        
}

export default UserContext