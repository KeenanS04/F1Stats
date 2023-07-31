import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Drivers from './pages/Drivers'
import Constructors from './pages/Constructors'
import Races from './pages/Races'
import Seasons from './pages/Seasons'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/drivers' element={<Drivers />}/>
        <Route path='/constructors' element={<Constructors />}/>
        <Route path='/races' element={<Races />} />
        <Route path='/seasons' element={<Seasons />} />
      </Routes>
    </div>
  )
}

export default App
