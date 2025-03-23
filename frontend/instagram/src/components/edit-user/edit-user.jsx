import { useState, useEffect } from 'react';
import { request_get_user, request_patch_user } from '../../lib/requests';
import get_pk from '../../lib/pk';
import { useNavigate } from 'react-router-dom';
import './edit-user-style.css'

const EditMyPage = () => {
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState('')
    const pk = get_pk();

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await request_get_user({ pk })

                setUsername(response.data.username);
                setStatus(response.data.status);

            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, [pk]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('status', status)
        if (image) {
            formData.append('image', image);
        }

        try {
            await request_patch_user({ pk, formData })
            navigate('/my-page/')
        } catch (error) {
            setError(error.response.request.responseText);
        }
    };

    return (
        <div>
            <h2>Редактирование профиля</h2>
            <p className="error-text-form">{error}</p>
            <form className="form-for-edit-user-profile" onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username || ''} onChange={handleUsernameChange} />
                </label><br /><br />
                <label>
                    Status:
                    <input type="text" value={status || ''} onChange={handleStatusChange} />
                </label><br /><br />
                <label>
                    Profile Image:
                    <input className="input-for-edit-image-user" type="file" onChange={handleImageChange} />
                </label><br /><br />
                <div className="box-for-button-edit-profile-user">
                    <button className="button-for-edit-profile-user" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default EditMyPage;