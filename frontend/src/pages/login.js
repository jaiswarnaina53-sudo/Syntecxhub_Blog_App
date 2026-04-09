import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input style={styles.input} type="email" placeholder="Email"
          value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input style={styles.input} type="password" placeholder="Password"
          value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        <button style={styles.btn} type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

const styles = {
  container: { maxWidth:'400px', margin:'80px auto', padding:'30px',
    boxShadow:'0 0 10px rgba(0,0,0,0.1)', borderRadius:'8px' },
  input: { display:'block', width:'100%', padding:'10px', marginBottom:'15px',
    borderRadius:'4px', border:'1px solid #ccc', boxSizing:'border-box' },
  btn: { width:'100%', padding:'10px', backgroundColor:'#333',
    color:'white', border:'none', borderRadius:'4px', cursor:'pointer' },
  error: { color:'red' }
};

export default Login;