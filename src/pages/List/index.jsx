import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Book from '../Book';

const List = () => {
	const params = useParams(); // object
	// variables up in the URL
	
	console.log(`params is ${JSON.stringify(params.listId)}`);
	const currentLists = useSelector(store => store.currentLists);

	const currentList = currentLists.filter((list) => list.list_id == params.listId)[0];

	console.log(currentList);
	return (
		<>
			<h1>Best Sellers for {currentList.list_name}</h1>

			{currentList.books.map((book) => 
				<div key={book.book_image}><Book book={book}/></div>
			)}
			{/* {currentList.books.map((book) => (
            // <div className="book-flex" key={book.title}>
            //   <h2>Rank: {book.rank}</h2>
            //   <img src={book.book_image} alt="book covers" />
            //   <h2>{book.title}</h2>
            //   <h3>{book.author}</h3>
            //   <h3>{book.description}</h3>
            // </div>
          ))} */}

		</>

	)
}

export default List