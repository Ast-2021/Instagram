import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('access');

    return isAuthenticated ? (
        children
    ) : (
        <Navigate to="/auth/" replace />
    );
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
