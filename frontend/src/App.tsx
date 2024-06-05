import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './components/nav/Menu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Menu/>
    </>
  )
}

export default App
