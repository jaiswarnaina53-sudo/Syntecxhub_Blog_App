import { useState, useEffect } from 'react';
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) formData.append('image', image);

      await axios.put(`http://localhost:5000/api/posts/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/post/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <input style={styles.input} type="text" placeholder="Post Title"
          value={title} onChange={e => setTitle(e.target.value)} required />
        <label>Content:</label>
        <div data-color-mode="light" style={{marginBottom:'60px'}}>
          <MDEditor value={content} onChange={setContent} height={250} />
        </div>
        <label style={{display:'block', marginBottom:'8px'}}>Change Image:</label>
        <input type="file" accept="image/*"
          onChange={e => setImage(e.target.files[0])}
          style={{marginBottom:'15px'}} />
        <button style={styles.btn} type="submit">Update Post</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth:'700px', margin:'30px auto', padding:'20px' },
  input: { display:'block', width:'100%', padding:'10px', marginBottom:'15px',
    borderRadius:'4px', border:'1px solid #ccc', boxSizing:'border-box', fontSize:'16px' },
  btn: { padding:'10px 20px', backgroundColor:'#333',
    color:'white', border:'none', borderRadius:'4px', cursor:'pointer' }
};

export default EditPost;