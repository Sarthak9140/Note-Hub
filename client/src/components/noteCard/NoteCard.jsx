import React from 'react';
import { Link } from 'react-router-dom';
import './NoteCard.scss';

function NoteCard({ title, desc, image, id }) {
  return (
    <Link to={`/note/${id}`} className="note-card-link">
      <div className="note-card">
        {image && <img src={image} alt={title} />}
        <div className="note-content">
          <h2>{title}</h2>
          <p>{desc.length > 100 ? `${desc.slice(0, 100)}...` : desc}</p>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
