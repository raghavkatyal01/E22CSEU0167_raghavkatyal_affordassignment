import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-around">
            <Link to="/" className="text-lg font-semibold">Top Users</Link>
            <Link to="/trending" className="text-lg font-semibold">Trending Posts</Link>
            <Link to="/feed" className="text-lg font-semibold">Feed</Link>
        </nav>
    );
};

export default Navbar;
