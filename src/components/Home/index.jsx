import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Home = () => {

    const isbn = "1649374046";

    const nyKey = "";

    const date = "2023-10-02";

    useEffect(() => {
        const googleURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

        const nyTimesURL = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?published_date=${date}&api-key=${nyKey}`;

        axios.get(nyTimesURL).then((response) => console.log("NYTimes data is:", response));

        axios.get(googleURL).then((response) => console.log("Google Books API data is:", response));
      }
    , []);
    

  return (
    <div>Home</div>
  )
}

export default Home