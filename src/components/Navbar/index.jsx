import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<nav>
			<Link to="/">Home</Link>
			<input type="text" name="search" id="search" />
			<div className="dropdown">
				<span className="data-visualizations">Data Visualizations</span>
				<div className="dropdown-content">
					<Link to="/">Line Chart</Link>
					<Link to="/">Heat Map</Link>
					<Link to="/">Word Cloud</Link>
				</div>
			</div>


		</nav >
	)
}

export default Navbar