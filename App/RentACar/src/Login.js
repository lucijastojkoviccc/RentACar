import React, { useState } from 'react';
import axios from 'axios';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
            
            if (response.status === 200) {
                console.log('Uspesno logovanje:', response.data);
                // Simulate navigation to /Vlasnik/VlasnikCard
                window.location.href = '/Vlasnik/VlasnikCard';
            } else {
                setError('Pogrešno korisničko ime ili lozinka');
            }
        } catch (error) {
            console.error('Greška prilikom logovanja:', error);
            setError('Došlo je do greške prilikom logovanja');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2 style={{ color: 'white' }}>Log In</h2>

            <div style={{ margin: '10px' }}>
                <input type="text" placeholder="Korisničko ime" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '300px', padding: '10px' }} />
            </div>

            <div style={{ margin: '10px' }}>
                <input type="password" placeholder="Lozinka" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '300px', padding: '10px' }} />
            </div>
            
            <button onClick={handleLogin} style={{ backgroundColor: '#FEB7CE', color: 'white', padding: '10px', borderRadius: '0px', border: 'none' }}>Uloguj se</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default LoginComponent;
