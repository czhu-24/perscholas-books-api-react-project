import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchResults } from '../../redux/slices/searchResultsSlice';


const SearchResults = () => {
  const dispatch = useDispatch();

  const search = useSelector(store => store.search);

  useEffect(() => {
    const googleBooksURL = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyC4bABkWbzoFcF_dLc7cxRXaG0bKAwe7qQ`;
    axios.get(googleBooksURL)
      .then((response) => {
        console.log(`the response is`, response);
        dispatch(setSearchResults(response.data.items));
      })
      .catch((err) => {
        console.log("Error fetching data from Google Books", err);
      })
  }, [search, dispatch]);
  

  const searchResults = useSelector(store => store.searchResults);

  console.log(`search Results are ${JSON.stringify(searchResults)}`);

  
  return (
    <>
      <h1>Search Results for: &quot;{search}&quot;</h1>
      <h2>{searchResults.length} results</h2>
      
    </>
  )
}

export default SearchResults