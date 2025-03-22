import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { request_get_all_users } from '../../../lib/requests';
import ModalWindow from './modal-window';


const Followers = ({ relations }) => {

    const [users, setUsers] = useState([]);
    const [showFollowersModal, setShowFollowersModal] = useState(false);

    const handleFollowersClick = async () => {
        const usersPK = relations.followers.map(item => item.follower);

        try {
            const response = await request_get_all_users()
            const filteredUsers = response.data.filter(user => usersPK.includes(user.pk));
            setUsers(filteredUsers);
        } catch (error) {
            console.log('Ошибка:', error);
        }
        setShowFollowersModal(true);
    };

    const closeModal = () => {
        setShowFollowersModal(false);
    }

    return (
        <>
            <div className="followers" onClick={handleFollowersClick}>
                <p>{relations.count_followers}</p>
                <p>Followers</p>
            </div>

            <ModalWindow show={showFollowersModal} onClose={closeModal}>
                <h2>Followers</h2>
                <p>Number of followers: {relations.count_followers}</p>
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

Followers.propTypes = {
    follow: PropTypes.shape({
        count_followers: PropTypes.number.isRequired,
        followers: PropTypes.arrayOf(
            PropTypes.shape({
                follower: PropTypes.number.isRequired
            })
        ).isRequired
    }).isRequired
};

export default Followers