import {  createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/axios.js"

const AuthContext=createContext()

const AuthProvider=({Children})=>{
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
useEffect(()=>{
    getCurrentUser()
},[])
return (
    <AuthContext.Provider value={{
        user,setUser,setLoading,loading,getCurrentUser
    }}>
     {Children}
    </AuthContext.Provider>
)
}
const useAuth=()=>{
    return useContext(AuthContext)
}
export {AuthProvider,useAuth}