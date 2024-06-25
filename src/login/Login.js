import React, { useState , useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { PersonaService } from '../PersonaAPI';
import { AuthContext } from '../AuthProvider';

function Login() {
  const [user, setAllUsers] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [setErrorMessage] = useState('');
  const [setSuccessMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const personaService = new PersonaService();

  useEffect(() => {
    personaService.getUser().then(data =>  {
      setAllUsers(data);
      console.log(data);
    }).catch(error => {
      console.error("Error fetching Usuarios:", error);
    });
  }, [personaService, setAllUsers]);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = user.find(user => user.username === email && user.password === password);
    
    if (users) {
      login(users);
      setTimeout(() => {
        navigate('admin/*'); // Navega a la página de inicio
      }, 1000);
    } else {
      setErrorMessage('Correo electrónico o contraseña incorrectos');
      setSuccessMessage('');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <p>Ingresa tus credenciales para acceder a tu cuenta.</p>
        <label>Correo Electrónico</label>
        <input
          type="email"
          placeholder="nombre@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Tu Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="login-options">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p className="signup-link">¿No tienes una cuenta? <Link to="/register">Regístrate</Link></p>
      </form>
    </div>
  );
}

export default Login;
