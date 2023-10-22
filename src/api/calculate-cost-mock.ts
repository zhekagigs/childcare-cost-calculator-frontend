// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type MockChildData = {
  per_year: number,
  per_term: number,
  per_month: number[],

};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json({
   per_year: 14342,
   per_term: 3400,
   per_month: [1100, 1200, 300, 2222, 3411, 2234, 1121, 888, 1233, 1234, 1111, 1212],
   tax_free_childcare_year: 2000,
   thirty_hours_free_year: 10000,
  });
}
