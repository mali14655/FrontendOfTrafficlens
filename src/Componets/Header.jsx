import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
    <div className='w-full flex justify-center h-9 bg-blue-700 text-white items-center'>
        <div className='w-1/2 flex justify-center gap-8 h-full items-center  '>
        <Link to="/" >Home</Link>
        <Link to="/analysis" >Analysis</Link>
        </div>
    </div>
    </>
  )
}
