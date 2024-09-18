import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EventDetail.css'; 

function EventDetail() {
  const { eventoId } = useParams();
  const [evento, setEvento] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const eventoResponse = await axios.get(`http://127.0.0.1:8000/api/eventos/${eventoId}/`);
        setEvento(eventoResponse.data);
      } catch (error) {
        console.error('Error fetching evento:', error);
        setError('Error fetching evento');
      }
    };

    const fetchComentarios = async () => {
      try {
        const comentariosResponse = await axios.get(`http://127.0.0.1:8000/api/eventos/${eventoId}/comentarios/`);
        setComentarios(comentariosResponse.data);
      } catch (error) {
        console.error('Error fetching comentarios:', error);
        setError('Error fetching comentarios');
      } finally {
        setLoading(false);
      }
    };
    

    fetchEvento();
    fetchComentarios();
  }, [eventoId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/eventos/${eventoId}/comentarios/`,
        { contenido: newComment },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
        }
      );
      setComentarios([...comentarios, response.data]); 
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {/* Detalles del evento */}
      {evento && (
        <>
          <h1 className="evento-title">{evento.title}</h1>
          {evento.image && <img src={evento.image} alt={evento.title} className="evento-image" />}
          <p>{evento.description}</p>
          <p>Fecha: {new Date(evento.date).toLocaleDateString()}</p>
        </>
      )}
  
      {/* Sección de comentarios */}
      <h2>Comentarios</h2>
      {comentarios.length > 0 ? (
        <ul className="comentarios-list">
          {comentarios.map(comentario => (
            <li key={comentario.id} className="comentario-item">
              <strong>{comentario.usuario}</strong>: {comentario.contenido}
              <br />
              <small>Publicado el {new Date(comentario.fecha_publicacion).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay comentarios aún. Sé el primero en comentar.</p>
      )}
  
      {/* Formulario para añadir comentarios */}
      <form onSubmit={handleCommentSubmit} className="comentario-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="4"
          placeholder="Escribe tu comentario"
          required
          className="comentario-textarea"
        />
        <button type="submit" className="comentario-button">Enviar comentario</button>
      </form>
    </div>
  );
}

export default EventDetail;
