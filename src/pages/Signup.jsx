import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('email', email);
    formData.append('password', password);
    if (image) {
      formData.append('image', image);
    }
    const data = await api.signup(formData);
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
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="wrapper">
      <section className="form signup">
        <header>Realtime Chat App</header>
        <form onSubmit={handleSubmit} autoComplete="off">
          {error && <div className="error-text">{error}</div>}
          <div className="name-details">
            <div className="field input">
              <label>First Name</label>
              <input
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="First name"
                required
              />
            </div>
            <div className="field input">
              <label>Last Name</label>
              <input
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Last name"
                required
              />
            </div>
          </div>
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
              placeholder="Enter new password"
              required
            />
            <i
              className={`fas fa-eye${showPassword ? '' : '-slash'}`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          <div className="field image">
            <label>Select Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/x-png,image/gif,image/jpeg,image/jpg"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="field button">
            <input type="submit" value="Continue to Chat" />
          </div>
        </form>
        <div className="link">
          Already signed up? <Link to="/login">Login now</Link>
        </div>
      </section>
    </div>
  );
}
