import React, { useEffect, useState } from "react";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>{event.name} - {new Date(event.date).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
