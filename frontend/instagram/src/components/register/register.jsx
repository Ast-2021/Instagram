import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { request_create_user } from "../../lib/requests";
import "./register-style.css"

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {username, password}

        try {
            await request_create_user({data})
            navigate('/auth/')
        } catch {
            setError('Registration failed')
        }
    };

    return (
        <div className="register">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register