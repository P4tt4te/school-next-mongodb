import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idMovie } = req.query;
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    if (idMovie) {
      const dbMovie = await db
        .collection("movies")
        .findOne({
          _id: new ObjectId(Array.isArray(idMovie) ? idMovie[0] : idMovie),
        });
      res.json({ status: 200, data: { movie: dbMovie } });
    }
  } catch (e) {
    res.status(500).json(e);
  }
}
