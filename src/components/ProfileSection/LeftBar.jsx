import React from 'react'
import { PiSignOut } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
const LeftBar = ({SignOut,DeleteAcc,SetProfile}) => {
  return (
    <div className=' h-screen'>
         <div className="bg-secondary hidden h-full sm:block flex-1  border-r-2 border-orange-500">
        <h1 className=" text-6xl font-semibold p-10 border-b-[1px] border-amber-700 ">
          Quizzy
        </h1>
        <div className="flex flex-col justify-between  h-[80%]">
          <div className="flex flex-col gap-4 mt-5">
            <h1 className="font-semibold uppercase text-xl cursor-pointer hover:bg-orange-400 p-2" onClick={()=>SetProfile(true)}>Profile</h1>
            <h1 className="font-semibold uppercase text-xl cursor-pointer hover:bg-orange-400 p-2" onClick={()=>SetProfile(false)}>Edit Profile</h1>
          </div>
          <div className="flex flex-col gap-2">
            <button className="flex gap-1 text-2xl items-center p-4 hover:bg-orange-400 text-white" onClick={SignOut} > <PiSignOut /> Sign-out</button>
            <button className="flex gap-1 text-xl items-center p-4 hover:bg-orange-400 text-white" onClick={DeleteAcc}> <MdDelete /> Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar;