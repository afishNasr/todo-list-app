import { useState, useEffect } from 'react';
import './_app.tsx';

type Todo = {
  id: number;
  activity: string;
  price: number;
  type: string;
  bookingRequired: boolean;
  accessibility: number;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [form, setForm] = useState({
    activity: '',
    price: '',
    type: 'education',
    bookingRequired: false,
    accessibility: 0.5,
  });

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.activity || !form.price) return;
    setTodos([...todos, { ...form, id: Date.now(), price: Number(form.price) }]);
    setForm({ activity: '', price: '', type: 'education', bookingRequired: false, accessibility: 0.5 });
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="box">
      <h1>Todo List</h1>
      <p>Total Items: {todos.length}</p>
      <form onSubmit={handleSubmit} className="box">
        <input className="add-task" name="activity" value={form.activity} onChange={handleChange} placeholder="Activity" required />
        <input className="add-task" name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required />
        <select className="add-task" name="type" value={form.type} onChange={handleChange}>
          {['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <label className='label'>
          Booking Required
          <input className="add-task" name="bookingRequired" type="checkbox" checked={form.bookingRequired} onChange={handleChange} />
        </label>
        <label className='label'>
          Accessibility: {form.accessibility}
          <input name="accessibility" type="range" min="0" max="1" step="0.1" value={form.accessibility} onChange={handleChange} />
        </label>
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="task-item">
            {todo.activity} - ${todo.price} - {todo.type} - Booking: {todo.bookingRequired ? 'Yes' : 'No'} - Accessibility: {todo.accessibility}
            <div className="task-buttons">
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
