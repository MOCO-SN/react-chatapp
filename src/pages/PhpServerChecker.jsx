import { useState } from 'react';

export default function PhpServerChecker() {
  const [status, setStatus] = useState('idle'); // idle | checking | ok | error
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const checkServer = async () => {
    setStatus('checking');
    setMessage('');
    setError('');
    try {
      const res = await fetch('/php/health.php', {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { status: 'error', message: text };
      }
      if (data.status === 'ok') {
        setStatus('ok');
        setMessage(data.message || 'Server connected');
      } else {
        setStatus('error');
        setError(data.message || data.error || 'Unknown error');
      }
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Network error');
    }
  };

  return (
    <div className="wrapper">
      <section className="form signup">
        <header>PHP Server Check</header>
        <div style={{ padding: '10px 0' }}>
          <button
            type="button"
            onClick={checkServer}
            disabled={status === 'checking'}
            style={{
              width: '100%',
              height: 45,
              border: 'none',
              color: '#fff',
              background: '#333',
              borderRadius: 5,
              cursor: status === 'checking' ? 'wait' : 'pointer',
              fontSize: 17,
            }}
          >
            {status === 'checking' ? 'Checking...' : 'Check Server Connection'}
          </button>
          {status === 'ok' && (
            <div style={{
              marginTop: 10,
              padding: '8px 10px',
              borderRadius: 5,
              background: '#d4edda',
              color: '#155724',
              border: '1px solid #c3e6cb',
            }}>
              {message}
            </div>
          )}
          {status === 'error' && (
            <div style={{
              marginTop: 10,
              padding: '8px 10px',
              borderRadius: 5,
              background: '#f8d7da',
              color: '#721c24',
              border: '1px solid #f5c6cb',
            }}>
              {error}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
