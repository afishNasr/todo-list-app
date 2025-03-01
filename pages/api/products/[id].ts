import type { NextApiRequest, NextApiResponse } from 'next';

const products = [
  { productId: '1', name: 'Product 1' },
  { productId: '2', name: 'Product 2' },
  { productId: '3', name: 'Product 3' },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const product = products.find((p) => p.productId === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json(product);
}
