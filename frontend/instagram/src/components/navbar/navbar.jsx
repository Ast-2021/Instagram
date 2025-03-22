import { Link } from 'react-router-dom';
import { useState } from 'react';
import useAuth from './use-auth';
import SearchModal from './search-modal-box/search-modal-box';
import AuthenticatedButtons from './authenticated-buttons';
import UnauthenticatedButtons from './unauthenticated-buttons';
import './navbar-style.css'

function Navbar() {
    const { isAuthenticated, handleLogout } = useAuth();
    const [showModalWindow, setShowModalWindow] = useState(false);

    const openModalWindow = () => {
        setShowModalWindow(true);
    };

    const closeModalWindow = () => {
        setShowModalWindow(false);
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {!isAuthenticated ? (
                    <UnauthenticatedButtons />
                ) : (
                    <AuthenticatedButtons handleLogout={handleLogout} />
                )}
                <li className='search-link' onClick={openModalWindow}>Search</li>
            </ul>
            <SearchModal show={showModalWindow} onClose={closeModalWindow} />
        </nav>
    );
}

export default Navbar;