import { Link } from 'react-router-dom';

function UnauthenticatedButtons() {
    return (
        <>
        <li>
            <Link to="/register/">Register</Link>
        </li>
        <li>
            <Link to="/auth/">Authorization</Link>
        </li>
        </>
    );
}

export default UnauthenticatedButtons;