import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import React from 'react';

type Product = {
  productId: string;
  name: string;
};

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Product not found');
          }
          return res.json();
        })
        .then((data) => setProduct(data))
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) {
    return (
      <div style={containerStyle}>
        <p style={errorStyle}>Error: {error}</p>
        <Link href="/" style={buttonStyle}>
          Back to Homepage
        </Link>
      </div>
    );
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Product Details</h1>
      <p><strong>Product ID:</strong> {product.productId}</p>
      <p><strong>Product Name:</strong> {product.name}</p>
      <Link href="/" style={buttonStyle}>
        Back to Homepage
      </Link>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  maxWidth: '400px',
  margin: '20px auto',
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
};

const headingStyle: React.CSSProperties = {
  fontSize: '24px',
  marginBottom: '20px',
};

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '10px 20px',
  marginTop: '20px',
  backgroundColor: '#0070f3',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
};
const errorStyle: React.CSSProperties = {
  color: 'red',
  fontSize: '18px',
};
