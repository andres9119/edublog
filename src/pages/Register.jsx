import React, { useState } from 'react';
import './Register.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);  // Para manejar errores de la API
  const [isSubmitting, setIsSubmitting] = useState(false);  // Para manejar el estado del envío

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!email.includes("@") || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Por favor ingresa un email válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError(null); // Limpiar errores anteriores
    setIsSubmitting(true); // Indicar que se está enviando la solicitud

    // Datos del registro
    const userData = { username, email, password, password2 };

    // Petición a la API para registrar al usuario
    fetch('http://localhost:8000/register/', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
      setIsSubmitting(false); // Volver a habilitar el botón de envío

      if (data.token) {
        alert('Registro exitoso');
        // Esta pendiente redirigir al usuario o hacer algo más aquí
      } else {
        setError(data.message || 'No se pudo registrar.');
      }
    })
    .catch((error) => {
      setIsSubmitting(false); // Volver a habilitar el botón de envío
      console.error('Error:', error);
      setError('Ocurrió un error inesperado. Por favor, intenta de nuevo.');
    });
  };

  return (
    <main className="register-main">
      <div className="register-container">
        <h1>Registro</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="form-input"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Mostrar error */}
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="register-help">
          <p>¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
        </div>
      </div>
    </main>
  );
}

export default Register;
