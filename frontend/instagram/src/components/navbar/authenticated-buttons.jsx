import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function AuthenticatedButtons({ handleLogout }) {

    return (
        <>
        <li>
            <Link to="/my-page/">My profile</Link>
        </li>
        <li>
            <Link to="/create/">Create</Link>
        </li>
        <li>
            <button onClick={handleLogout}>Logout</button>
        </li>
        </>
    );
}

AuthenticatedButtons.propTypes = {
    handleLogout: PropTypes.func,
}

export default AuthenticatedButtons;