import { CommentCollection } from "@/services/collections/CommentCollection";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * The handler function for the /api/comments endpoint.
 *
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 *
 * @swagger
 * /api/comments:
 *   get:
 *     description: Returns the last 10 comments from the database.
 *     responses:
 *       200:
 *         description: The 10 last comments.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const collection = await CommentCollection();
    const comments = await collection.find({}).limit(10).toArray();

    req.method === "GET" && res.json({ status: 200, data: comments });
  } catch (e) {
    res.status(500).json(e);
  }
}
