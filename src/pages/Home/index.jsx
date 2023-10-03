import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


const Home = () => {



  const [booksLists, setBooksLists] = useState([]);

  const isbn = "1649374046";

  const nyKey = "";

  const currentDate = new Date();
  // date in YYYY-DD-MM format, so pad 0 to date & month if necessary
  const date = `${currentDate.getFullYear()}-${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const displayedLists = ["hardcover-fiction", "hardcover-nonfiction", "combined-print-and-e-book-fiction", "combined-print-and-e-book-nonfiction"];

  useEffect(() => {
    const googleURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

    // const nyTimesURL = `https://api.nytimes.com/svc/books/v3/lists/${date}/${list}.json?api-key=${nyKey}`;

    const nyTimesURL = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?published_date=${date}&api-key=${nyKey}`

    axios.get(nyTimesURL).then((response) => {
      console.log("NYTimes data is:", response);
      setBooksLists((response.data.results.lists));
    }).catch((error) => {
      // Handle any potential errors here
      console.error("Error fetching data from NYTimes:", error);
    });

    //axios.get(googleURL).then((response) => console.log("Google Books API data is:", response));
  }
    , []);


  return (
    <>
      {console.log(booksLists)}

      {booksLists.map((list) => (
        <div key={list.list_name_encoded}>
          <h1>{list.list_name} for {`${monthName}, ${currentDate.getDate()}, ${currentDate.getFullYear()}`}</h1>
          {list.books.map((book) => (
            <div className="book-flex" key={book.description}>
              <h2>Rank: {book.rank}</h2>
              <img style={{ width: "25vw" }} src={book.book_image} alt="blah" />
              <h2>{book.title}</h2>
              <h3>{book.author}</h3>
              <h3>{book.description}</h3>
            </div>
          ))}
        </div>
      ))}

    </>
  )
}

export default Home