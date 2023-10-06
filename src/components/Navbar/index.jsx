import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Navbar = () => {

	return (
		<nav>
			<Link to="/">Home</Link>
			
			<div className="searchBar">
				<div>help</div>
				<button>Advanced search</button>
				<input type="text" name="search" id="search" default="Search something!" />
				<button><Link to="/searchresults">Search</Link></button>
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