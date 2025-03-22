import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem('access')
    const navigate = useNavigate();

    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false);
        navigate('')
    };

    return { isAuthenticated, handleLogout };
}

export default useAuth;