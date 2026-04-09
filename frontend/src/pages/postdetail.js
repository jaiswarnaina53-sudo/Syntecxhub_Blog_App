import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!post) return <p style={{textAlign:'center', marginTop:'50px'}}>Loading...</p>;

  return (
    <div style={styles.container}>
      {post.image && (
        <img src={`http://localhost:5000/uploads/${post.image}`}
          alt={post.title} style={styles.img} />
      )}
      <h1>{post.title}</h1>
      <p style={styles.author}>By {post.author?.username}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      {user && user.id === post.author?._id && (
        <div style={styles.actions}>
          <Link to={`/edit/${post._id}`} style={styles.editBtn}>Edit</Link>
          <button onClick={handleDelete} style={styles.deleteBtn}>Delete</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth:'800px', margin:'30px auto', padding:'20px' },
  img: { width:'100%', height:'300px', objectFit:'cover', borderRadius:'8px' },
  author: { color:'#666', marginBottom:'20px' },
  actions: { marginTop:'30px', display:'flex', gap:'10px' },
  editBtn: { padding:'8px 16px', backgroundColor:'#333', color:'white',
    textDecoration:'none', borderRadius:'4px' },
  deleteBtn: { padding:'8px 16px', backgroundColor:'#e74c3c', color:'white',
    border:'none', borderRadius:'4px', cursor:'pointer' }
};

export default PostDetail;