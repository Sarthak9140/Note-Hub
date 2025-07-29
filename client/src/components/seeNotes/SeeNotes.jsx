// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './seeNotes.scss';
// import axios from 'axios';

// function SeeNotes() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [editMode, setEditMode] = useState(false);
//   const [title, setTitle] = useState('');
//   const [desc, setDesc] = useState('');

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8080/card/getSingleCard/${id}`);
//         setTitle(res.data.title);
//         setDesc(res.data.desc);
//       } catch (err) {
//         console.error('Failed to fetch note:', err);
//       }
//     };
//     fetchNote();
//   }, [id]);

//   const handleEdit = () => {
//     setEditMode(true);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:8080/card/updateCard/${id}`, {
//         title,
//         desc,
//       });
//       setEditMode(false);
//     } catch (err) {
//       console.error('Failed to save note:', err);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:8080/card/deleteCard/${id}`);
//       navigate('/');
//     } catch (err) {
//       console.error('Failed to delete note:', err);
//     }
//   };

//   return (
//     <div className='seeNotes'>
//       <div className="content-title">
//         {editMode ? (
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="edit-title"
//           />
//         ) : (
//           <h1>{title}</h1>
//         )}
//       </div>

//       <div className="disc">
//         {editMode ? (
//           <textarea
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//             className="edit-desc"
//             rows={10}
//           />
//         ) : (
//           <p>{desc}</p>
//         )}
//       </div>

//       <div className="button-group">
//         {!editMode ? (
//           <button className='edit' onClick={handleEdit}>Edit</button>
//         ) : (
//           <button className='edit' onClick={handleSave}>Save</button>
//         )}
//         <button className='delete' onClick={handleDelete}>Delete</button>
//       </div>
//     </div>
//   );
// }

// export default SeeNotes;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './seeNotes.scss';
import axios from 'axios';

function SeeNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [note, setNote] = useState({ title: '', desc: '', image: '' });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/card/getSingleCard/${id}`);
        setNote(res.data);
      } catch (err) {
        console.error('Failed to fetch note:', err);
      }
    };

    fetchNote();
  }, [id]);

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/card/updateCard/${id}`, {
        title: note.title,
        desc: note.desc,
      });
      setEditMode(false);
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/card/deleteCard/${id}`);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  return (
    <div className="seeNotes">
      {note.image && (
        <div className="note-image">
          <img src={`http://localhost:8080/${note.image}`} alt={note.title} />
        </div>
      )}
      <div className="content-title">
        {editMode ? (
          <input
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            className="edit-title"
          />
        ) : (
          <h1>{note.title}</h1>
        )}
      </div>

      <div className="disc">
        {editMode ? (
          <textarea
            value={note.desc}
            onChange={(e) => setNote({ ...note, desc: e.target.value })}
            className="edit-desc"
            rows={10}
          />
        ) : (
          <p>{note.desc}</p>
        )}
      </div>

      <div className="button-group">
        {!editMode ? (
          <button className="edit" onClick={handleEdit}>Edit</button>
        ) : (
          <button className="edit" onClick={handleSave}>Save</button>
        )}
        <button className="delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default SeeNotes;
