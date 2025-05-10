import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Avatar from "./Avatar";

export default function Navbar() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-extrabold text-xl">Mento-R</Link>
                <div className="flex space-x-4 items-center">
                    <Link to="/courses" className="text-white hover:text-gray-200 font-semibold px-3 py-2 rounded transition">Mentors</Link>
                    {isAuthenticated ? (
                        isDashboard ? (
                            <Avatar />
                        ) : (
                            <>
                                <Link to="/dashboard" className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-md hover:bg-indigo-100 transition">Dashboard</Link>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </>
                        )
                    ) : (
                        <Link to="/login" className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded-md hover:bg-indigo-100 transition">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

