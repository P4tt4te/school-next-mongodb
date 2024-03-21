import { MovieCollection } from "@/services/collections/MovieCollection";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * The handler function for the /api/movies endpoint.
 *
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 *
 * @swagger
 * /api/movie/{movieId}:
 *   get:
 *     summary: Get a movie by ID
 *     parameters:
 *     - in: path
 *       name: movieId
 *       required: true
 *       schema:
 *         type: string
 *       description: Numeric ID of the movie to get
 *     responses:
 *       200:
 *         description: Succeded request.
 *       400:
 *         description: The movie dosen't exist or is not valid.
 *   post:
 *      summary: Insert a new movie
 *      parameters:
 *      - in: path
 *        name: movieId
 *        required: true
 *        schema:
 *          type: string
 *        description: Numeric ID of the future inserted movie
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *      responses:
 *        200:
 *         description: Succeded request.
 *        400:
 *         description: The movie dosen't exist or is not valid.
 *   put:
 *      summary: Replace data on an existing movie.
 *      parameters:
 *      - in: path
 *        name: movieId
 *        required: true
 *        schema:
 *          type: string
 *        description: Numeric ID of the future replaced movie
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *      responses:
 *         200:
 *          description: Succeded request.
 *         400:
 *          description: The movie dosen't exist or is not valid.
 *   delete:
 *      summary: Delete an existing movie.
 *      parameters:
 *      - in: path
 *        name: movieId
 *        required: true
 *        schema:
 *          type: string
 *        description: Numeric ID of the future deleted movie
 *      responses:
 *         200:
 *          description: Succeded request.
 *         400:
 *          description: The movie dosen't exist or is not valid.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idMovie } = req.query;
    const movieObject = req.body;
    const collection = await MovieCollection();

    if (idMovie) {
      const dbMovie = await collection.findOne({
        _id: new ObjectId(Array.isArray(idMovie) ? idMovie[0] : idMovie),
      });

      switch (req.method) {
        case "POST":
          if (!movieObject)
            return res
              .status(400)
              .json("You need to pass a movie to a movieObject body key.");

          if (dbMovie)
            return res.status(400).json("You can't insert a existing movie.");

          const postingResult = await collection.insertOne({
            ...movieObject,
            _id: new ObjectId(Array.isArray(idMovie) ? idMovie[0] : idMovie),
          });
          res.json({ status: 200, data: { movie: postingResult } });
          break;
        case "GET":
          if (dbMovie === null)
            return res.status(400).json("You can't get an empty movie.");

          res.json({ status: 200, data: { movie: dbMovie } });
          break;
        case "PUT":
          if (dbMovie === null)
            return res.status(400).json("You can't replace an empty movie.");

          if (!movieObject)
            return res
              .status(400)
              .json("You need to pass a movie to a movieObject body key.");

          const puttingResult = await collection.replaceOne(dbMovie, {
            ...movieObject,
            _id: new ObjectId(Array.isArray(idMovie) ? idMovie[0] : idMovie),
          });
          res.json({ status: 200, data: { movie: puttingResult } });
          break;
        case "DELETE":
          if (dbMovie === null)
            return res.status(400).json("You can't delete an empty movie.");

          const deletedResult = await collection.deleteOne({
            _id: new ObjectId(Array.isArray(idMovie) ? idMovie[0] : idMovie),
          });

          res.json({ status: 200, data: { movie: deletedResult } });
          break;
      }
    }
  } catch (e) {
    res.status(500).json(e);
  }
}
