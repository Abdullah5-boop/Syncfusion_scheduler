import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Demo_1 from './Component/Demo_1/Demo_1'
import Scheduler from './Component/Scheduler_1/Scheduler'


function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    {/* <Demo_1 ></Demo_1> */}
    {/* <h1>hello world</h1> */}
    <Scheduler></Scheduler>
    </>
  )
}

export default App
