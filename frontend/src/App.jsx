import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddJob from './pages/AddJob'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddJob />} />
        {/* <Route path="/edit" element={<EditJob />} /> */}
      </Routes>
    </>
  )
}

export default App
