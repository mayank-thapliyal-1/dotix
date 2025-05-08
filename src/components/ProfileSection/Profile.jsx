 import React from 'react'
  const Profile = ({Profile}) => {
    return (
      <div className={`${Profile?'block':'hidden'} flex-2 w-full`}>
<div className="h-full overflow-scroll w-full flex flex-col justify-between items-center bg-slate-100 p-0 sm:p-10">
<div className="bg-white p-5 w-full flex flex-col gap-5">
  <div className="flex flex-col sm:flex-row  gap-10 items-center bg-slate-200 p-5 rounded-2xl w-full">
    <img
      src="src/assets/profile.png"
      className="w-40 h-40 rounded-full object-fill overflow-hidden"
      alt=""
    />
    <div className="flex flex-col gap-3">
      <h1 className="text-5xl">UserName</h1>
      <h2>@username</h2>
    </div>
  </div>
  <hr />
  <div className="flex w-full  justify-evenly items-center">
    <div className="grid grid-cols-2 gap-6 gap-x-20">
      <h2 className="text-lg font-bold">First Name:</h2>{" "}
      <h2 className="text-lg font-light text-gray-600">Jhon</h2>
      <h2 className="text-lg font-bold">Last Name:</h2>{" "}
      <h2 className="text-lg font-light text-gray-600">Wick</h2>
      <h2 className="text-lg font-bold">Gender:</h2>{" "}
      <h2 className="text-lg font-light text-gray-600">Male</h2>
      <h2 className="text-lg font-bold">Location:</h2>{" "}
      <h2 className="text-lg font-light text-gray-600">Raipur</h2>
    </div>
    <div className="grid grid-cols-2 gap-6 ">
      {" "}
      <h2 className="text-lg font-bold">Email:</h2>{" "}
      <h2 className="text-lg font-light text-gray-600">
        Jhon100@gmail.com
      </h2>{" "}
      <h2 className="text-lg font-bold">Username</h2>
      <h2 className="text-lg font-light text-gray-600">smasher98</h2>
      <h2 className="text-lg font-bold">Phone:</h2>
      <h2 className="text-lg font-light text-gray-600">985679601</h2>
      <h2 className="text-lg font-bold">Dob</h2>
      <h2 className="text-lg font-light text-gray-600">18-08-90</h2>
    </div>
  </div>
  <h1 className="text-center font-semibold text-3xl underline uppercase mt-5 text-gray-700">Progress Report</h1>
</div>
<button className="bg-blue-400 font-white p-5 text-xl text-white font-bold hover:bg-blue-600 rounded-lg" onClick={()=>navigate("/home")}>Go Back Home</button>
</div> */
      </div>
    )
  }
  
  export default Profile
