import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';

function UserProfile({ setUser }) { // accept setUser from App
    const [savedCodes, setSavedCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchSavedCodes();
    }, []);

    const fetchSavedCodes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/user-codes', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSavedCodes(response.data);
        } catch (error) {
            console.error('Failed to fetch codes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCodeClick = (code) => {
        navigate('/code', { state: { savedCode: code } });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>My Saved Codes</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </header>

            <div className="saved-codes-grid">
                {savedCodes.map((code) => (
                    <div 
                        key={code.ID} // MySQL returns capital ID unless aliased
                        className="code-card"
                        onClick={() => handleCodeClick(code)}
                    >
                        <h3>{code.title}</h3>
                        <p className="language">{code.language}</p>
                        <p className="date">
                            {new Date(code.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))}
                {savedCodes.length === 0 && (
                    <div className="no-codes">
                        <p>You haven't saved any codes yet.</p>
                        <button onClick={() => navigate('/code')}>
                            Start Coding
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
