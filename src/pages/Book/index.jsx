import React from 'react'
import { Link, useParams } from 'react-router-dom'


const Book = ({book}) => {
	const params = useParams();
	return (
		<>
            <div className="book-flex" key={book.title}>
              <h2>Rank: {book.rank}</h2>
              <img src={book.book_image} alt="book covers" />
              <Link to={`/book/${book.primary_isbn13}`}><h2>{book.title}</h2></Link>
              <h3>{book.author}</h3>
              <h3>{book.description}</h3>
            </div>
		</>
	)
}

export default Book