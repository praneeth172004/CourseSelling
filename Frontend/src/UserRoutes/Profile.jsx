import axios from 'axios'
import React, { useState } from 'react'

export default function Profile() {
    const [data,setdata]=useState("");
   async function userdetails(){
    const data=await axios.get("http://localhost:2004/user/home",{
        withCredentials:true
    })
    const username=data.data.username;
    console.log(username);
    setdata(username)
   }
   userdetails()
  return (
    <div className='h-screen bg-black flex justify-center items-center'>
        <div className='text-4xl text-white'>{data}</div>
    </div> 
  )
}
