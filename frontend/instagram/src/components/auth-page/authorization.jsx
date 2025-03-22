import { useState } from "react"
import {request_get_token} from "../../lib/requests"
import { jwtDecode } from "jwt-decode";
import "./auth-style.css"


function Authorization() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = { username, password }

        try {
            const response = await request_get_token({data});
            const {access, refresh} = response.data;

            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);

            const decode = jwtDecode(access)
            localStorage.setItem('pk', decode.user_id)
            
            window.location.href = '/';
        } catch {
            setError('Authorization failed');
        }
    };

    return (
        <div className="authorization">
            <h2>Authorization</h2>
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
                <button type="submit">Authorization</button>
            </form>
        </div>
    )
}

export default Authorization