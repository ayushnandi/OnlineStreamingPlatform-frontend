import { useState } from 'react'
import VideoUpload from './components/VideoUpload.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="">
        <VideoUpload/>
      </div>
    </>
  )
}

export default App;
