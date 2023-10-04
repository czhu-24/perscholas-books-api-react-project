import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCurrentLists } from '../../redux/slices/currentListsSlice'
import { setCurrentDate } from '../../redux/slices/currentDateSlice'

const Home = () => {
  const dispatch = useDispatch();

  const nyKey = useSelector((store) => store.key.key);

  const currentDate = new Date();
  // date in YYYY-DD-MM format, so pad 0 to date & month if necessary
  const date = `${currentDate.getFullYear()}-${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;

  dispatch(setCurrentDate(date));
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  //const displayedLists = ["hardcover-fiction", "hardcover-nonfiction", "combined-print-and-e-book-fiction", "combined-print-and-e-book-nonfiction"];

  useEffect(() => {
    const nyTimesURL = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?published_date=${date}&api-key=${nyKey}`;

    axios.get(nyTimesURL).then((response) => {
      //console.log("NYTimes data is:", response);
      setBooksLists((response.data.results.lists));

      dispatch(addCurrentLists(response.data.results.lists));
    }).catch((error) => {
      // Handle any potential errors here
      console.error("Error fetching data from NYTimes:", error);
    });
  }
    , []);


  const currentLists = useSelector((store) => store.currentLists);

  return (
    <>
      {currentLists ? currentLists.map((list) => (
        <div key={uuidv4()}>
          <h1><Link to={`/list/${list.list_name}`}>{list.list_name} for {`${monthName}, ${currentDate.getDate()}, ${currentDate.getFullYear()}`}</Link></h1>
          {list.books.map((book) => (
            <div className="book-flex" key={uuidv4()}>
              <h2>Rank: {book.rank}</h2>
              <img src={book.book_image} alt="book covers" />
              <h2><Link to={`book/${book.title}`}>{book.title}</Link></h2>
              <h3>{book.author}</h3>
              <h3>{book.description}</h3>
            </div>
          ))}
        </div>
      )) : <div> Loading... </div>}

    </>
  )
}

export default Home