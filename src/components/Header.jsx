// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

function Header() {
  return (
    <header>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/news">Noticias</Link></li>
          <li><Link to="/events">Eventos</Link></li>
        </ul>
        <ul className="auth-links">
          <li><Link to="/login">Ingresa</Link></li>
          <li><Link to="/register">Regístrate</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
