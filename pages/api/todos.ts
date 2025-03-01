import { NextApiRequest, NextApiResponse } from 'next';

let tasks = [
  { id: 1, text: 'Learn Next.js' },
  { id: 2, text: 'Build a To-Do App' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Read all tasks
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    // Add a new task
    const { text } = req.body;
    const newTask = { id: Date.now(), text };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else if (req.method === 'DELETE') {
    // Delete a task
    const { id } = req.query;
    tasks = tasks.filter((task) => task.id !== Number(id));
    res.status(200).json({ message: 'Task deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
