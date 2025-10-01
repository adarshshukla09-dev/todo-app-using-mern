import React, { useEffect, useState } from 'react';
import api from './api';
import './App.css'; // import the improved CSS

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await api.post('/todos', { text: text.trim() });
      setTodos(prev => [res.data, ...prev]);
      setText('');
    } catch (err) { console.error(err); }
  };

  const toggleComplete = async (todo) => {
    try {
      const res = await api.put(`/todos/${todo._id}`, { completed: !todo.completed });
      setTodos(prev => prev.map(t => t._id === todo._id ? res.data : t));
    } catch (err) { console.error(err); }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(prev => prev.filter(t => t._id !== id));
    } catch (err) { console.error(err); }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditingText(todo.text);
  };

  const saveEdit = async (id) => {
    if (!editingText.trim()) return;
    try {
      const res = await api.put(`/todos/${id}`, { text: editingText.trim() });
      setTodos(prev => prev.map(t => t._id === id ? res.data : t));
      setEditingId(null);
      setEditingText('');
    } catch (err) { console.error(err); }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div className="App">
      <h1>Simple MERN To-Do</h1>

      <form onSubmit={addTodo} className="todo-form">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </form>

      {loading ? <p style={{ textAlign: 'center' }}>Loading...</p> : (
        <ul>
          {todos.map(todo => (
            <li key={todo._id} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo)}
              />

              {editingId === todo._id ? (
                <>
                  <input
                    value={editingText}
                    onChange={e => setEditingText(e.target.value)}
                    className="edit-input"
                  />
                  <button onClick={() => saveEdit(todo._id)} className="save-btn">Save</button>
                  <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                </>
              ) : (
                <>
                  <span className={todo.completed ? 'text-completed' : ''}>{todo.text}</span>
                  <button onClick={() => startEdit(todo)} className="edit-btn">Edit</button>
                  <button onClick={() => deleteTodo(todo._id)} className="delete-btn">Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
