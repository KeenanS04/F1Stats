import { Link } from "react-router-dom";


function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="navbar--logo">F1Stats</h1>
            <Link to='/'>Home</Link>
            <Link to='/drivers'>Drivers</Link>
            <Link to='/constructors'>Constructors</Link>
            <Link to='/races'>Races</Link>
            <Link to='/seasons'>Seasons</Link>
        </nav>
    )
}

export default Navbar;