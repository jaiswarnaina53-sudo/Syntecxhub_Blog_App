import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={styles.container}>
      <h1>Latest Blog Posts</h1>
      {posts.length === 0 && <p>No posts yet. Be the first to create one!</p>}
      <div style={styles.grid}>
        {posts.map(post => (
          <div key={post._id} style={styles.card}>
            {post.image && (
              <img src={`http://localhost:5000/uploads/${post.image}`}
                alt={post.title} style={styles.img} />
            )}
            <h2>{post.title}</h2>
            <p style={styles.author}>By {post.author?.username}</p>
            <div style={styles.preview}
              dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + '...' }} />
            <Link to={`/post/${post._id}`} style={styles.readMore}>Read More →</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth:'900px', margin:'30px auto', padding:'0 20px' },
  grid: { display:'flex', flexDirection:'column', gap:'20px' },
  card: { padding:'20px', border:'1px solid #ddd', borderRadius:'8px',
    boxShadow:'0 2px 5px rgba(0,0,0,0.1)' },
  img: { width:'100%', height:'200px', objectFit:'cover', borderRadius:'6px' },
  author: { color:'#666', fontSize:'14px' },
  preview: { color:'#444' },
  readMore: { color:'#333', fontWeight:'bold', textDecoration:'none' }
};

export default Home;