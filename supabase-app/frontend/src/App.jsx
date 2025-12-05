import { useEffect, useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  async function load() {
    const res = await fetch('http://localhost:3000/todos');
    const data = await res.json();
    setTodos(data);
  }

  async function add() {
    if (!text) return;

    await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    setText('');
    load();
  }

  async function toggle(todo) {
    await fetch(`http://localhost:3000/todos/${todo.id}/toggle`, {
      method: 'PUT',
    });

    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>TODOs</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite um todo..."
      />
      <button onClick={add}>Adicionar</button>

      <ul>
        {todos?.map((t) => (
          <li key={t.id}>
            <label style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggle(t)}
              />
              {t.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
