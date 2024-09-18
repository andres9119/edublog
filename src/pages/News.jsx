// src/pages/News.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.css';  

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/noticias/')
      .then(response => {
        setNews(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setError('Error fetching news');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="news-loading">Loading...</p>;
  }

  if (error) {
    return <p className="news-error">{error}</p>;
  }

  return (
    <main className="news-main">
      <h1 className="news-header">Avisos y noticias</h1>
      {news.length === 0 ? (
        <p className="news-empty">No hay novedades</p>
      ) : (
        <ul className="news-list">
          {news.map(item => (
            <li key={item.id} className="news-item">
              <h2 className="news-title">{item.title}</h2>
              {item.image && <img className="news-image" src={item.image} alt={item.title} />}
              <p className="news-content">{item.content}</p>
              <small className="news-date">{item.published_at}</small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default News;
