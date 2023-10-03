import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import HeatMap from './pages/HeatMap';

function App() {

  // TODO: need to make hasKey a global state
  // yeah, put that into the store. *sigh*
  const [hasKey, setHasKey] = useState(false);
  const [keyInput, setKeyInput] = useState("");

  function handleKeySubmission() {
    // TODO: perform an API key with the key and if the response comes back with no errors, THEN, store it in localStorage & set hasKey to  true
    if (keyInput === "key") {
      setHasKey(true);
    }
  }

  return (
    <>
      {hasKey ? "" : <>
        <h1> Welcome to this site! please enter your NYTimes API Key below </h1>
        <input value={keyInput} onChange={(e) => setKeyInput(e.target.value)} type="text" />
        <button onClick={handleKeySubmission}>Submit</button>
      </>}
      {hasKey ? <><Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heatmap" element={<HeatMap />} />
        </Routes>
        <Footer /></>
        : ""}
    </>
  )
}

export default App
