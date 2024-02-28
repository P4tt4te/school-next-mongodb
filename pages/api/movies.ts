import { MovieCollection } from "@/services/collections/MovieCollection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const collection = await MovieCollection();
    const movies = await collection.find({}).limit(10).toArray();
    req.method === "GET" && res.json({ status: 200, data: movies });
  } catch (e) {
    res.status(500).json(e);
  }
}
