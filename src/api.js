const API_BASE = import.meta.env.VITE_API_URL || '/php';

export const api = {
  login: async (email, password) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    const res = await fetch(`${API_BASE}/login.php`, {
      method: 'POST',
      body: formData,
    });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { error: text || 'Invalid response from server' };
    }
  },

  signup: async (formData) => {
    const res = await fetch(`${API_BASE}/signup.php`, {
      method: 'POST',
      body: formData,
    });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { error: text || 'Invalid response from server' };
    }
  },

  logout: async (uniqueId) => {
    const formData = new FormData();
    formData.append('logout_id', uniqueId);
    const res = await fetch(`${API_BASE}/logout.php`, {
      method: 'POST',
      body: formData,
    });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { error: text || 'Invalid response from server' };
    }
  },

  getUsers: async (uniqueId) => {
    const formData = new FormData();
    formData.append('unique_id', uniqueId);
    const res = await fetch(`${API_BASE}/users.php`, {
      method: 'POST',
      body: formData,
    });
    return await res.text();
  },

  searchUsers: async (uniqueId, searchTerm) => {
    const formData = new FormData();
    formData.append('unique_id', uniqueId);
    formData.append('searchTerm', searchTerm);
    const res = await fetch(`${API_BASE}/search.php`, {
      method: 'POST',
      body: formData,
    });
    return await res.text();
  },

  getChat: async (uniqueId, incomingId) => {
    const formData = new FormData();
    formData.append('unique_id', uniqueId);
    formData.append('incoming_id', incomingId);
    const res = await fetch(`${API_BASE}/get-chat.php`, {
      method: 'POST',
      body: formData,
    });
    return await res.text();
  },

  insertChat: async (uniqueId, incomingId, message) => {
    const formData = new FormData();
    formData.append('unique_id', uniqueId);
    formData.append('incoming_id', incomingId);
    formData.append('message', message);
    const res = await fetch(`${API_BASE}/insert-chat.php`, {
      method: 'POST',
      body: formData,
    });
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return { error: text || 'Invalid response from server' };
    }
  },
};
