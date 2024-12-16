import React, { useRef, useState } from 'react'
import { base_url } from './api.jsx';
export default function Register() {
    const [data,setdata]=useState({
        websiteName:"",
        url:""
    });
    
    const [url,seturl]=useState(" ");
    const textRef=useRef(null);



    const copyUrl=async()=>{
        const valueTobbCopied=textRef.current.value;
        if(valueTobbCopied){
            try{
                await navigator.clipboard.writeText(valueTobbCopied)
                alert(`${textRef.current.value} copied to clipboard !`);
            }
            catch(err){
                alert("error while copying!");
            }
        }
        else{
            alert("Input is Empty !")
        }
    }

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setdata({...data,[name]:value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        fetch(`${base_url}/user/create`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })
        .then(res=>(res.json()))
        .then((data)=>{
            if(data.url){
                    seturl(data.url);
                    alert(data.msg)
            }else if(data.error){
                alert(data.error);
            }
            else{
                alert(data.msg);
            }
        })

    }




  return (
    <>
    <div className='w-full flex justify-center  h-[50vh]'>
    <form className='w-1/2 flex flex-col justify-center items-center gap-8' onSubmit={handleSubmit}>
        <h1 className='text-lg font-medium'>Register using your URL</h1>
        <div className='w-full flex flex-col items-center gap-2'>
            <label htmlFor="webname" className='text-black font-medium w-1/2'>Website Name</label>
            <input type="text" onChange={handleChange} className='text-black w-1/2 outline-1 px-1 border-[1px]   border-blue-500 outline-blue-700 rounded-md' name="websiteName" id="webname" placeholder='Website Name' />
        </div>
        
        <div className='w-full flex flex-col items-center gap-2'>
        <label htmlFor="url" className='text-black font-medium w-1/2'>Url</label>
        <input type="url" onChange={handleChange} className='text-black w-1/2 px-1 outline-1 border-[1px]   border-blue-500 outline-blue-700 rounded-md' name="url" id="url" placeholder='url here...' />
        </div>
        <div className='w-full flex justify-center'>
        <input type="submit" className='w-[90%] bg-blue-700 rounded-md text-white font-medium hover:cursor-pointer h-8' value={"Submit"}/>
        </div>
    </form>
    </div>
    <div className='w-full flex justify-center h-[50vh]'>
    <div className='w-1/2 flex justify-center flex-col gap-4  items-center'>
        <label htmlFor='newurl'className='text-lg font-medium'>Here is your unique Url</label>
       <input type="url" readOnly value={url}  className='w-1/2 border-[1px]   border-blue-500 outline-1 outline-blue-700 rounded-md' ref={textRef}  name="newurl" id="newurl" />
       <button onClick={copyUrl}  className='w-[30%] bg-blue-700 rounded-md text-white font-medium hover:cursor-pointer h-8' >Copy</button>
    </div>
    </div>
    </>
  )
}
