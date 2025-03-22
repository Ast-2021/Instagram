import { useState } from 'react';
import ModalWindow from './modal-window';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { request_get_all_users } from '../../../lib/requests';


function Following({ relations }) {
    const [users, setUsers] = useState([]);
    const [showFollowingModal, setShowFollowingModal] = useState(false);

    const handleFollowingClick = async () => {
        const usersPK = relations.following.map(item => item.following);

        try {
            const response = await request_get_all_users()
            const filteredUsers = response.data.filter(user => usersPK.includes(user.pk));
            setUsers(filteredUsers);

        } catch (error) {
            console.log('Ошибка:', error);
        }
        setShowFollowingModal(true);
    };

    const closeModal = () => {
        setShowFollowingModal(false);
    }

    return (
        <>
            <div className="following" onClick={handleFollowingClick}>
                <p>{relations.count_following}</p>
                <p>Following</p>
            </div>

            <ModalWindow show={showFollowingModal} onClose={closeModal}>
                <h2>Following</h2>
                <p>Number of following: {relations.count_following}</p>
                {users.map((item, key) => (
                    <div key={key}>
                        <Link to={`/user-page/${item.pk}/`} key={key}>
                            <img className="user-image" src={item.image} alt={item.username} />
                            <p>{item.username}</p>
                        </Link>
                    </div>
                ))}
            </ModalWindow>
        </>
    );
}

Following.propTypes = {
    follow: PropTypes.shape({
        count_following: PropTypes.number.isRequired,
        following: PropTypes.arrayOf(
            PropTypes.shape({
                follower: PropTypes.number.isRequired
            })
        ).isRequired
    }).isRequired
};

export default Following;
