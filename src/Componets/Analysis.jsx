import React, { useEffect, useState } from 'react'
import { base_url } from './api';
import { ToastContainer,toast } from 'react-toastify';
export default function Analysis() {
    const[data,setdata]=useState({
      websiteName:""
    })
    const [resData,setresData]=useState({
      clicks:"",
      records: []
    });
    // Determine color based on the value
  const getColor = () => {
    if(Number(resData.clicks)< 500) return 'text-red-500';
    if (Number(resData.clicks) < 1_000) return 'text-blue-500'; // Thousands
    if (Number(resData.clicks) < 1_000_000) return 'text-green-500'; // Millions
    if (Number(resData.clicks) < 1_000_000_000) return 'text-yellow-500'; // Billions
    return 'text-red-500'; // Trillions or higher
  };

  // Convert value for human-readable format
  const formatValue = (val) => {
    if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(2)}B`; // Billions
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(2)}M`; // Millions
    if (val >= 1_000) return `${(val / 1_000).toFixed(2)}K`; // Thousands
    return val.toString(); // Less than 1000
  };

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setdata({...data,[name]:value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(data.websiteName==""){
      toast.error(`Website Name Required !`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
        });
    }
    else{

      fetch(`${base_url}/user/analysis/${data.websiteName}`)
      .then((res)=>(res.json()))                                      
      .then((data)=>{
      if(data.error){
        toast.error(`${data.error} !`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
          });;
      }
      else{
        console.log(data)
        setresData(data);
      }
    })
  }
  }

  return (
    <>
    <ToastContainer/>
    <div className='w-full flex justify-center mt-10 h-[40vh]'>
      <form action="" onSubmit={handleSubmit} className='w-1/2 flex justify-center'>
      <div className='w-full flex flex-col items-center gap-8'>
        <label htmlFor="websiteName" className='text-lg font-medium'>Website Name:</label>
        <input type="text" onChange={handleChange} placeholder='Enter your Website Name' className='text-black w-1/2 outline-1 px-1 border-[1px]   border-blue-500 outline-blue-700 rounded-md' name='websiteName' id='websiteName' />
        <button  className='w-[30%] bg-blue-700 rounded-md text-white font-medium hover:cursor-pointer h-8' >Search</button>      
      </div>
        </form>      
    </div>


    <div className='w-full flex gap-2'>
        <div className="w-1/2 border-[1px] border-black bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-4">Details</h2>
          {Array.isArray(resData.records) && resData.records.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {resData.records.map((record, index) => (
                <li key={index} className="text-gray-700">
                  <p><strong>IP:</strong> {record.ip}</p>
                  <p><strong>City:</strong> {record.city}</p>
                  <p><strong>Country:</strong> {record.country}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No records available</p>
          )}
        </div>
    
    <div className="flex w-1/2 border-[1px] border-black shadow-md rounded-md  h-[50vh] justify-center items-center bg-gray-100">
      <div className="relative flex items-center justify-center w-40 h-40">
        {/* Circle Background */}
        <div className="absolute w-full h-full rounded-full bg-gray-300"></div>

        {/* Progress Circle */}
        <svg
          className="w-full h-full transform rotate-[-90deg]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 36"
        >
          <circle
            className="text-gray-300 stroke-current"
            strokeWidth="3.8"
            fill="none"
            cx="18"
            cy="18"
            r="15.9155"
            />
          <circle
            className={`${getColor()} stroke-current`}
            strokeWidth="3.8"
            strokeDasharray="100, 100" // Full ring filled
            strokeLinecap="round"
            fill="none"
            cx="18"
            cy="18"
            r="15.9155"
            />
        </svg>

        {/* Value Display */}
        <div className="absolute flex flex-col items-center">
          <span
            className={`text-lg font-bold ${getColor()}`}
            >
            {formatValue(Number(resData.clicks))}
          </span>
          <span className="text-sm text-gray-500">clicks</span>
        </div>
      </div>
    </div>

</div>
    
    </>
  )
}

 