import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [intentos, setIntentos] = useState(0);
    const [bloqueado, setBloqueado] = useState(false);

    useEffect(() => {
        const bloqueadoHasta = localStorage.getItem('bloqueadoHasta');

        if (bloqueadoHasta) {
            const tiempoBloqueo = parseInt(bloqueadoHasta);
            const ahora = new Date().getTime();

            if (ahora < tiempoBloqueo) {
                setBloqueado(true);

                const timeoutId = setTimeout(() => {
                    setBloqueado(false);
                    localStorage.removeItem('bloqueadoHasta');
                    localStorage.removeItem('intentos');
                }, tiempoBloqueo - ahora);

                return () => clearTimeout(timeoutId);
            } else {

                localStorage.removeItem('bloqueadoHasta');
                localStorage.removeItem('intentos');
            }
        }


        const intentosGuardados = localStorage.getItem('intentos');
        if (intentosGuardados) {
            setIntentos(parseInt(intentosGuardados));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (bloqueado) {
            return;
        }

        const userData = JSON.parse(localStorage.getItem('userData') || '{}');

        if (userData.email === formData.email && userData.password === formData.password) {
            setIntentos(0);
            localStorage.removeItem('intentos');


            navigate('/profile');
        } else {
            const nuevosIntentos = intentos + 1;
            setIntentos(nuevosIntentos);
            localStorage.setItem('intentos', nuevosIntentos.toString());

            if (nuevosIntentos >= 3) {
                const tiempoBloqueo = new Date().getTime() + 60000;
                localStorage.setItem('bloqueadoHasta', tiempoBloqueo.toString());
                setBloqueado(true);
                setError('Has excedido el número máximo de intentos. Cuenta bloqueada por 1 minuto.');


                setTimeout(() => {
                    setBloqueado(false);
                    setIntentos(0);
                    localStorage.removeItem('bloqueadoHasta');
                    localStorage.removeItem('intentos');
                    setError('');
                }, 60000);
            } else {
                setError(`Credenciales incorrectas. Intentos restantes: ${3 - nuevosIntentos}`);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Iniciar Sesión</h2>
            {bloqueado ? (
                <div className="error-container">
                    <p>Cuenta bloqueada por exceso de intentos fallidos.</p>
                    <p>Intenta de nuevo en un momento.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-container">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn" disabled={bloqueado}>
                        Iniciar Sesión
                    </button>
                </form>
            )}
        </div>
    );
};

export default Login;