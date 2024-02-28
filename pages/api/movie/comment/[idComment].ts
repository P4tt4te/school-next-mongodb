import { CommentCollection } from "@/services/collections/CommentCollection";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idComment } = req.query;
    const collection = await CommentCollection();

    if (idComment) {
      const dbComment = await collection.findOne({
        _id: new ObjectId(Array.isArray(idComment) ? idComment[0] : idComment),
      });

      switch (req.method) {
        case "POST":
          break;
        case "GET":
          res.json({ status: 200, data: { movie: dbComment } });
          break;
        case "PUT":
          break;
        case "DELETE":
          break;
      }
    }
  } catch (e) {
    res.status(500).json(e);
  }
}
