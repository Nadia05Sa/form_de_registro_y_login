import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        } else {

            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {

        navigate('/login');
    };

    if (!userData) {
        return <div className="loading">Cargando datos...</div>;
    }

    return (
        <div className="profile-container">
            <h2>Perfil de Usuario</h2>

            <div className="profile-data">
                <div className="data-row">
                    <span className="label">Nombre:</span>
                    <span className="value">{userData.nombre}</span>
                </div>

                <div className="data-row">
                    <span className="label">Apellidos:</span>
                    <span className="value">{userData.apellidos}</span>
                </div>

                <div className="data-row">
                    <span className="label">Email:</span>
                    <span className="value">{userData.email}</span>
                </div>

                <div className="data-row">
                    <span className="label">Edad:</span>
                    <span className="value">{userData.edad}</span>
                </div>

                <div className="data-row">
                    <span className="label">Teléfono:</span>
                    <span className="value">{userData.telefono}</span>
                </div>
            </div>

            <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
        </div>
    );
};

export default UserProfile;