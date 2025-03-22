import { useState, useEffect } from 'react';
import ModalWindow from '../../../lib/modal-window/modal-window.jsx'
import { Link } from 'react-router-dom';
import { request_get_all_users } from '../../../lib/requests.jsx';
import PropTypes from 'prop-types';


function SearchModal({ show, onClose }) {
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (show) {
      const fetchUsers = async () => {
        try {
          const response = await request_get_all_users();
          setUsers(response.data);
          setFilteredUsers(response.data);
        } catch (error) {
          console.error('Ошибка при получении пользователей:', error);
        }
      };
      fetchUsers();
    }
  }, [show]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setInputValue(query);

    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <ModalWindow show={show} onClose={onClose}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Введите имя пользователя"
        className="search-input"
      />
      {filteredUsers.map(user => (
        <div key={user.pk}>
          <Link to={`/user-page/${user.pk}/`}>
            <img className="user-image" src={user.image} alt={user.username} />
            <p>{user.username}</p>
          </Link>
        </div>
      ))}
    </ModalWindow>
  );
}

SearchModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
}

export default SearchModal;