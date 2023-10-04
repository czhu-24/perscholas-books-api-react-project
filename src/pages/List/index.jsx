import React from 'react'
import { useParams } from 'react-router-dom';

const List = () => {

	const params = useParams(); // object
	// variables up in the URL
	console.log(params);
	return (
		<>
			<h1>Best Sellers for {params.listName}</h1>
		</>

	)
}

export default List