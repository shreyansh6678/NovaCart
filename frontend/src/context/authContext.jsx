import {  createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios.js"
import toast from "react-hot-toast";

const AuthContext=createContext()

const AuthProvider=({children})=>{
const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)
const getCurrentUser=async()=>{
    try {
        const response=await api.get("/users/current-user")
        setUser(response.data.data)
    } catch (error) {
        setUser(null)
    }
    finally{
        setLoading(false)
    }
}
const register=async(formData)=>{
    const response=await api.post("/users/register",formData)
}
const login=async(formData)=>{
        const response=await api.post("/users/login",formData)
         setUser(response.data.user)
         toast.success("Login Successfully")
      } 
useEffect(()=>{
    getCurrentUser()
},[])
const logout=async()=>{
  try {
    await api.post("/users/logout")
    setUser(null)
    toast.success("Logout Successfully")
  } catch (error) {
    toast.error(error?.response?.data?.message||"Logout failed")
  }
}
return (
    <AuthContext.Provider value={{
        user,setUser,setLoading,loading,getCurrentUser,register,login,logout
    }}>
     {children}
    </AuthContext.Provider>
)
}
const useAuth=()=>{
    return useContext(AuthContext)
}
export {AuthProvider,useAuth}