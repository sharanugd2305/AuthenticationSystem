import { useContext, useEffect } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      toast.success(result.data.message);
      navigate("/signin");
      setUserData(null);
    } catch (error) {
      console.log("Error in logging out :", error);
    }
  };

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#B8E3E9' }}>
      {/* Header with Custom Colors */}
      <header className="shadow-lg" style={{ backgroundColor: '#0B2E33' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            Profile Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border" style={{ borderColor: '#93B1B5' }}>
          {/* Profile Header Section with Avatar */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg" style={{ backgroundColor: '#4F7C82' }}>
              {userData?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <h2 className="text-2xl font-bold" style={{ color: '#0B2E33' }}>Welcome back, {userData?.name}!</h2>
            <p className="text-gray-500 mt-1">Manage your profile information below</p>
          </div>

          {/* Profile Information Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-6 pb-3 border-b-2 flex items-center" style={{ color: '#0B2E33', borderColor: '#93B1B5' }}>
              <svg className="w-6 h-6 mr-2" style={{ color: '#4F7C82' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile Information
            </h3>
            <div className="space-y-6">
              {/* Full Name Field */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <label className="text-sm font-semibold flex items-center" style={{ color: '#0B2E33' }}>
                  <svg className="w-5 h-5 mr-2" style={{ color: '#4F7C82' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Full Name
                </label>
                <p className="sm:col-span-2 p-4 rounded-xl shadow-sm border font-medium" style={{ backgroundColor: '#B8E3E9', borderColor: '#93B1B5', color: '#0B2E33' }}>
                  {userData?.name || ""}
                </p>
              </div>

              {/* Email Address Field */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <label className="text-sm font-semibold flex items-center" style={{ color: '#0B2E33' }}>
                  <svg className="w-5 h-5 mr-2" style={{ color: '#4F7C82' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <p className="sm:col-span-2 p-4 rounded-xl shadow-sm border font-medium break-all" style={{ backgroundColor: '#B8E3E9', borderColor: '#93B1B5', color: '#0B2E33' }}>
                  {userData?.email || ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}