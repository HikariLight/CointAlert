import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex justify-center my-2 py-4 border-b border-purple-800">
            <ul className="flex space-x-4">
                <li>
                    <Link className="hover:text-purple-800" to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        className="hover:text-purple-800"
                        to="/alertDefinitions">
                        Manage Alert Definitions
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
