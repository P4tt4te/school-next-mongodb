import { CommentCollection } from "@/services/collections/CommentCollection";
import type { NextApiRequest, NextApiResponse } from "next";

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
