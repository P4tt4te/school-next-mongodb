import { MovieCollection } from "@/services/collections/MovieCollection";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idMovie } = req.query;
    const collection = await MovieCollection();

    if (idMovie) {
      const dbMovie = await collection.findOne({
        _id: new ObjectId(Array.isArray(idMovie) ? idMovie[0] : idMovie),
      });

      switch (req.method) {
        case "POST":
          break;
        case "GET":
          res.json({ status: 200, data: { movie: dbMovie } });
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
