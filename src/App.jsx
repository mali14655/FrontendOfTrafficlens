import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Register from './Componets/Register'
import Analysis from './Componets/Analysis'
export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Register/>}  />
      <Route path='/analysis' element={<Analysis/>}  /> 
    </Routes>
    </>
  )
}
