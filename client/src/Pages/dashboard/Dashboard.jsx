
import React, { useEffect, useState } from 'react';
import NoteCard from '../../components/noteCard/NoteCard';
import './Dashboard.scss';
import axios from 'axios';

function Dashboard() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:8080/card/getCard');
        setNotes(res.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="dashboard">
      <div className="heading">
        <h1>All Notes</h1>
      </div>
      <div className="notes-grid">
        {notes.map((note, index) => (
          <NoteCard
            key={note._id || index}
            id={note._id}
            image={`http://localhost:8080/${note.image}`} // 👈 image path corrected
            desc={note.desc}
            title={note.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
