import { useState } from 'react'
import './App.css'
import './bootstrap.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import Landing from './Pages/Landing'
import { Route,Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/auth' element={<Auth/>} />
        <Route path='/dash' element={<Dashboard/>} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
