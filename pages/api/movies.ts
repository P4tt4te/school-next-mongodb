import { MovieCollection } from "@/services/collections/MovieCollection";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * The handler function for the /api/movies endpoint.
 *
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 *
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get the top 10 movies from the collection.
 *     responses:
 *       200:
 *         description: The top 10 movies.
 */
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
