const Navbar = () => {
    return (
        <nav className="flex justify-center my-2 py-4 border-b border-purple-800">
            <ul className="flex space-x-4">
                <li>
                    <a className="hover:text-purple-800" href="/">
                        Home
                    </a>
                </li>
                <li>
                    <a
                        className="hover:text-purple-800"
                        href="/alertDefinitions">
                        Manage Alert Definitions
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
