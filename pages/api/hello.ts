// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// pages/api/hello.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ message: 'Hello! im afishah you can call me asha!' });
}
