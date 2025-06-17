import { useState, useEffect } from 'react';

function App() {
  const API = import.meta.env.VITE_API_BASE_URL;

  const [greetings, setGreetings] = useState([]);
  const [language, setLanguage] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    const res = await fetch(`${API}/greetings`);
    const data = await res.json();
    setGreetings(data);
  };

  useEffect(() => { load(); }, []);

  const addGreeting = async e => {
    e.preventDefault();
    await fetch(`${API}/greetings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language, message })
    });
    setLanguage(''); setMessage('');
    load();
  };

  return (
    <div>
      <h1>Greetings</h1>

      <form onSubmit={addGreeting}>
        <input value={language} onChange={e => setLanguage(e.target.value)} placeholder="Language" required />
        <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Greeting" required />
        <button type="submit">Add</button>
      </form>

      <ul>
        {greetings.map(g => <li key={g.id}>{g.language}: {g.message}</li>)}
      </ul>
    </div>
  );
}

export default App;
