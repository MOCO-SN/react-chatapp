import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Users() {
  const [usersList, setUsersList] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const searchIconRef = useRef(null);

  const loadUsers = useCallback(async () => {
    if (!user) return;
    const html = await api.getUsers(user.unique_id);
    setUsersList(html);
  }, [user]);

  useEffect(() => {
    loadUsers();
    const interval = setInterval(loadUsers, 500);
    return () => clearInterval(interval);
  }, [loadUsers]);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
    if (!searchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (searchActive) {
      setSearchTerm('');
      loadUsers();
    }
  };

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term !== '') {
      const html = await api.searchUsers(user.unique_id, term);
      setUsersList(html);
    } else {
      loadUsers();
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="wrapper">
      <section className="users">
        <header>
          <div className="content">
            <img src={`/images/${user?.img}`} alt="" />
            <div className="details">
              <span>{user?.fname} {user?.lname}</span>
              <p>{user?.status}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout">Logout</button>
        </header>
        <div className="search">
          <span className="text">Select an user to start chat</span>
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter name to search..."
            className={searchActive ? 'show active' : ''}
          />
          <button
            ref={searchIconRef}
            onClick={handleSearchClick}
            className={searchActive ? 'active' : ''}
          >
            <i className={`fas fa-${searchActive ? 'times' : 'search'}`}></i>
          </button>
        </div>
        <div className="users-list" dangerouslySetInnerHTML={{ __html: usersList }} />
      </section>
    </div>
  );
}
