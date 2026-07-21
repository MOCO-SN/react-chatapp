import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.login(email, password);
      if (data.error) {
        setError(data.error);
      } else if (data.success) {
        login({
          unique_id: data.unique_id,
          fname: data.fname,
          lname: data.lname,
          img: data.img,
          status: data.status,
        });
        navigate('/users');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <section className="form login">
        <header>Realtime Chat App</header>
        <form onSubmit={handleSubmit} autoComplete="off">
          {error && <div className="error-text">{error}</div>}
          <div className="field input">
            <label>Email Address</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="field input">
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <i
              className={`fas fa-eye${showPassword ? '' : '-slash'}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          <div className="field button">
            <input type="submit" value="Continue to Chat" disabled={loading} />
          </div>
        </form>
        <div className="link">
          Not yet signed up? <Link to="/signup">Signup now</Link>
        </div>
      </section>
    </div>
  );
}
