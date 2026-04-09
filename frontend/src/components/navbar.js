import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>📝 BlogApp</Link>
      <div>
        {user ? (
          <>
            <span style={styles.welcome}>Hi, {user.username}!</span>
            <Link to="/create" style={styles.link}>Create Post</Link>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'10px 20px', backgroundColor:'#333', color:'white' },
  brand: { color:'white', textDecoration:'none', fontSize:'22px', fontWeight:'bold' },
  link: { color:'white', textDecoration:'none', marginLeft:'15px' },
  welcome: { color:'#aaa', marginRight:'10px' },
  btn: { marginLeft:'15px', padding:'5px 10px', cursor:'pointer',
    backgroundColor:'#e74c3c', color:'white', border:'none', borderRadius:'4px' }
};

export default Navbar;