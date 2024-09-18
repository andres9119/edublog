// src/pages/Events.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Events.css'; 

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/eventos/')
      .then(response => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setError('Error fetching events');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <main className="events-main">
      <h1 className="events-title">Events</h1>
      {events.length === 0 ? (
        <p className="no-events">No events available</p>
      ) : (
        <ul className="events-list">
          {events.map(event => (
            <li key={event.id} className="event-item">
              <Link to={`/events/${event.id}`}>
                <h2 className="event-title">{event.title}</h2>
                {event.image && <img src={event.image} alt={event.title} className="event-image" />}
              </Link>
              <p className="event-description">{event.description}</p>
              <small className="event-date">{new Date(event.date).toLocaleDateString()}</small>
              <p className="event-location">{event.location}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Events;
