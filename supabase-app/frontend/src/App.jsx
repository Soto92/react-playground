import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  async function load() {
    const { data } = await supabase.from('todos').select('*').order('id');
    setTodos(data);
  }

  async function add() {
    if (!text) return;
    await supabase.from('todos').insert({ text });
    setText('');
    load();
  }

  async function toggle(todo) {
    await supabase.from('todos').update({ done: !todo.done }).eq('id', todo.id);
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>TODOs</h1>

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={add}>Adicionar</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id} onClick={() => toggle(t)}>
            <input type="checkbox" checked={t.done} readOnly />
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
