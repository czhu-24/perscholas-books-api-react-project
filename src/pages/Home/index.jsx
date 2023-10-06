import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentLists } from '../../redux/slices/currentListsSlice'
import { generateFormattedDateFromObject, generateMonthName } from '../../utils/dateUtils'
import DatePicker from '../../components/DatePicker'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch();

  const nyKey = "gNiB3j1UoXh6bjDSRLuVQhAWbytpAwbu";

  //const nyKey = useSelector((store) => store.key.key);

  const [loading, setLoading] = useState(false);

  const initialRequestCounter = localStorage.getItem('requestCounter') || 0;
  const [requestCounter, setRequestCounter] = useState(parseInt(initialRequestCounter));


  const date = useSelector((store) => store.currentDate);

  const formattedDate = generateFormattedDateFromObject(date);
  //const displayedLists = ["hardcover-fiction", "hardcover-nonfiction", "combined-print-and-e-book-fiction", "combined-print-and-e-book-nonfiction"];

  const fetchNYTimesData = () => {
    setLoading(true);

    const nyTimesURL = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?published_date=${formattedDate}&api-key=${nyKey}`;

    axios.get(nyTimesURL) // returns a Promise
      .then((response) => {  // happens when promise is resolved
        dispatch(setCurrentLists(response.data.results.lists));
      })
      .catch((err) => {
        console.log("Error fetching data from NYTimes", err);
      })
      .finally(() => {
        setLoading(false);
      })
    }
    
    // throttled version of fetchNYTimesData using setTimeout, every 12 secs can do a new fetch
    let throttledFetchNYTimesData = () => {
      console.log(`counter is ${requestCounter}`);
  
      if (requestCounter < 4) {
        setRequestCounter(requestCounter + 1);
        fetchNYTimesData();
      } else if (requestCounter >= 4) {
        console.log("too many requests!");
        setRequestCounter(setTimeout(() => {
          setRequestCounter(0);
          localStorage.setItem('requestCounter', '0');
        }, 60000)); // Reset after 1 minute
      }
    };

  useEffect(() => {
    throttledFetchNYTimesData();
  }
    , [date]);

  const currentLists = useSelector((store) => store.currentLists);

  return (
    <>
    <DatePicker date={date} requestCounter={requestCounter}/>
    {loading ? (
      <div>Loading...</div>
    )  :
     (currentLists.map((list) => (
        
        <div key={list.list_id}>
          <h1><Link to={`/list/${list.list_id}`}>{list.list_name}</Link> for {`${generateMonthName(date.month)}, ${date.date}, ${date.year}`}</h1>
          {list.books.map((book) => (
            <div className="book-flex" key={book.title}>
              <h2>Rank: {book.rank}</h2>
              <img src={book.book_image} alt="book covers" />
              <h2><Link to={`/book/${book.primary_isbn13}`}>{book.title}</Link></h2>
              <h3>{book.author}</h3>
              <h3>{book.description}</h3>
            </div>
          ))}
        </div>
      ))
    )}
  </>
  )
}

export default Home