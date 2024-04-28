import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Quiz from './componants/Quiz'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from "./componants/Login"

function App() {
 

  return (
    <>
 <Login/>   
<Quiz/>
    </>
  )
}

export default App
