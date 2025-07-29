import React, { useState } from 'react';
import './Add.scss';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../../../Backend/utils/newRequest'; // ✅ Correct relative path

function Add() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    if (image) {
      formData.append('image', image);
    }

    try {
      await newRequest.post('/card/createCard', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/');
    } catch (err) {
      console.error('❌ Error creating note:', err.response?.data || err.message);
    }
  };

  return (
    <div className="add">
      <h1>Add Notes</h1>
      <form className="content-add" onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="coverImage" className="image-label">Choose Cover Image</label>
        <input
          type="file"
          id="coverImage"
          accept="image/*"
          onChange={handleImageChange}
        />

        <input
          type="text"
          placeholder="Title"
          className="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Start writing here..."
          className="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        ></textarea>

        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Add;
