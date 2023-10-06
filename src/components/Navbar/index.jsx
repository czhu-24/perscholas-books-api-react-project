import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { useDispatch } from 'react-redux'
import { setSearch } from '../../redux/slices/searchSlice'

const Navbar = () => {
	const dispatch = useDispatch();

	const [searchString, setSearchString] = useState("");

	const handleSearch = () => {
		dispatch(setSearch(searchString));
		setSearchString("");
	}

	return (
		<nav>
			<Link to="/">Home</Link>
			
			<div className="searchBar">
				<div>help</div>
				<button>Advanced search</button>
				<input value={searchString} onChange={(e) => setSearchString(e.target.value)} type="text" name="search" id="search" default="Search something!" />
				<button onClick={handleSearch}><Link to="/searchresults">Search</Link></button>
			</div>
			<div className="dropdown">
				<span className="data-visualizations">Data Visualizations</span>
				<div className="dropdown-content">
					<Link to="/linechart">Line Chart</Link>
					<Link to="/heatmap">Heat Map</Link>
					<Link to="/wordcloud">Word Cloud</Link>
				</div>
			</div>


		</nav >
	)
}

export default Navbar