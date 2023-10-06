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

  //const nyKey = useSelector((store) => store.key.key);

  const [loading, setLoading] = useState(false);

  const initialRequestCounter = localStorage.getItem('requestCounter') || 0;
  const [requestCounter, setRequestCounter] = useState(parseInt(initialRequestCounter));


  const date = useSelector((store) => store.currentDate);


  //const displayedLists = ["hardcover-fiction", "hardcover-nonfiction", "combined-print-and-e-book-fiction", "combined-print-and-e-book-nonfiction"];

  // throttled version of fetchNYTimesData using setTimeout, every minute, can do a max of 5 requests
  const throttledFetchNYTimesData = () => {
    console.log(`counter is ${requestCounter}`);
    if (requestCounter <= 5) {
      setRequestCounter(requestCounter + 1);
      fetchNYTimesData();
    } else if (requestCounter > 5) {
      console.log("too many requests!");
      setRequestCounter(setTimeout(() => {

        setRequestCounter(0);
        localStorage.setItem('requestCounter', '0');
      }, 60000)); // Reset after 1 minute
    }


  };

  // this should force me to do an API call every 12 secs...
  const throttledFetchNYTimesData2 = () => {
    const intervalId = setInterval(() => {
      fetchNYTimesData();
    }, 12000);

    return intervalId;
  }


  const currentLists = useSelector((store) => store.currentLists);

  return (
    <>
      <DatePicker requestCounter={requestCounter} />
      {loading ? (
        <div>Loading...</div>
      ) :
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