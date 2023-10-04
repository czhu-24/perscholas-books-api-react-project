import { useState } from 'react'
import './App.css'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import HeatMap from './pages/HeatMap';
import LineChart from './pages/LineChart';
import WordCloud from './pages/WordCloud';
import { useDispatch, useSelector } from 'react-redux';
import { enteredKey, enteredWrongKey } from './redux/slices/hasKeySlice';
import { setKey } from './redux/slices/keySlice';
import List from './pages/List';
import Book from './pages/Book';
import axios from 'axios';


function App() {

  // getting state from store
  const hasKey = useSelector((store) => store.hasKey);

  const dispatch = useDispatch();
  const [keyInput, setKeyInput] = useState("");

  function handleKeySubmission() {
    axios.get(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${keyInput}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(enteredKey());
          dispatch(setKey(keyInput));
        }
      }
      ).catch((error) => {
        console.log("error", error);
        dispatch(enteredWrongKey());
      });
  }

  return (
    <div className="main-page">
      {hasKey ? "" : <>
        <h1> Welcome to this site! Please enter your NYTimes API Key below</h1>
        <input value={keyInput} onChange={(e) => setKeyInput(e.target.value)} type="text" />
        <button onClick={handleKeySubmission}>Submit</button>
      </>}
      {hasKey ? <><Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/linechart" element={<LineChart />} />
          <Route path="/heatmap" element={<HeatMap />} />
          <Route path="/wordcloud" element={<WordCloud />} />
          <Route path="/list/:listName" element={<List />} />
          <Route path="/book/:bookName" element={<Book />} />
        </Routes>
        <Footer /></>
        : ""}
    </div>
  )
}

export default App
