import Link from 'next/link';

export default function About() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>About Us</h1>
      <p>This is the about page of our Next.js app.</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
