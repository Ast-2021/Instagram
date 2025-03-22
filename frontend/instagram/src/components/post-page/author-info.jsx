import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { request_get_user } from '../../lib/requests';


const AuthorInfo = ({ author }) => {
    const [user, setUser] = useState('')
    
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await request_get_user({pk: author})
                setUser(response.data)
            } catch (error) {
                console.error('Ошибка при получении данных автора поста:', error);
            }
        };
        fetchPostData();
    }, [author])

    return (
        <Link to={`/user-page/${author}/`}>
            <div className="author">
                <img src={user.image} alt="author" />
                <h4>{user.username}</h4>
            </div>
        </Link>
    )
};

AuthorInfo.propTypes = {
    author: PropTypes.number,
}

export default AuthorInfo;