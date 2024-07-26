import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();
    const { email } = location.state || {};
    const [passwords, setPasswords] = useState([]);

    const [sitename, setSitename] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regEmail, setRegEmail] = useState("");

    const getPasswords = async() => {
        try {
            const response = await axios.post('http://localhost:3000/getPasswords', {
                email: email,
            });
            setPasswords(response.data);
        } catch (error) {
            console.error('Error fetching passwords:', error);
        }
    };

    const addPassword = async() => {
        try {
            const response = await axios.post('http://localhost:3000/addPassword', {
                user_email: email,
                reg_sitename: sitename,
                reg_email: regEmail,
                reg_password: regPassword,
            });
            alert(response.data);
            getPasswords(); // Refresh passwords after adding a new one
        } catch (error) {
            console.error('Error adding password:', error);
        }
    };

    useEffect(() => {
        getPasswords();
    }, []);

    return (
        <div className='Home'>
            <h2>Your Passwords</h2>
            <div className="passwords">
                <ul>
                    {passwords.map((password, index) => (
                        <li key={index}>
                            <strong>Site:</strong> {password.sitename}, 
                            <strong>Email:</strong> {password.email}, 
                            <strong>Password:</strong> {password.password}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="new-box">
                <h4>Add a new one</h4>
                <input
                    type="text"
                    placeholder='Site Name'
                    value={sitename}
                    onChange={(e) => setSitename(e.target.value)}
                /> <br />
                <input
                    type="text"
                    placeholder={`Your Registered email on ${sitename}`}
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                /> <br />
                <input
                    type="password"
                    placeholder={`Your Registered password on ${sitename}`}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                />
                <button onClick={addPassword}>Add +</button>
            </div>
        </div>
    );
};

export default Home;
