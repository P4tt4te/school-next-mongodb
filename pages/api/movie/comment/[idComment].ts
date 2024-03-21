import { CommentCollection } from "@/services/collections/CommentCollection";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * The handler function for the /api/movies endpoint.
 *
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 *
 * @swagger
 * /api/movie/comment/{commentId}:
 *   get:
 *     summary: Get a comment by ID
 *     parameters:
 *     - in: path
 *       name: commentId
 *       required: true
 *       schema:
 *         type: string
 *       description: Numeric ID of the comment to get
 *     responses:
 *       200:
 *         description: Succeded request.
 *       400:
 *         description: The comment dosen't exist or is not valid.
 *   post:
 *      summary: Insert a new comment
 *      parameters:
 *      - in: path
 *        name: commentId
 *        required: true
 *        schema:
 *          type: string
 *        description: Numeric ID of the future inserted comment
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
 *         description: The comment dosen't exist or is not valid.
 *   put:
 *      summary: Replace data on an existing comment.
 *      parameters:
 *      - in: path
 *        name: commentId
 *        required: true
 *        schema:
 *          type: string
 *        description: Numeric ID of the future replaced comment
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
 *          description: The comment dosen't exist or is not valid.
 *   delete:
 *      summary: Delete an existing comment.
 *      parameters:
 *      - in: path
 *        name: commentId
 *        required: true
 *        schema:
 *          type: string
 *        description: Numeric ID of the future deleted comment
 *      responses:
 *         200:
 *          description: Succeded request.
 *         400:
 *          description: The comment dosen't exist or is not valid.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { idComment } = req.query;
    const commentObject = req.body;
    const collection = await CommentCollection();

    if (idComment) {
      const dbComment = await collection.findOne({
        _id: new ObjectId(Array.isArray(idComment) ? idComment[0] : idComment),
      });

      switch (req.method) {
        case "POST":
          if (!commentObject)
            return res
              .status(400)
              .json("You need to pass a movie to a commentObject body key.");

          if (dbComment)
            return res.status(400).json("You can't insert a existing comment.");

          const postingResult = await collection.insertOne({
            ...commentObject,
            _id: new ObjectId(
              Array.isArray(idComment) ? idComment[0] : idComment
            ),
          });
          res.json({ status: 200, data: { comment: postingResult } });

          break;
        case "GET":
          res.json({ status: 200, data: { comment: dbComment } });
          break;
        case "PUT":
          if (dbComment === null)
            return res.status(400).json("You can't replace an empty comment.");

          if (!commentObject)
            return res
              .status(400)
              .json("You need to pass a movie to a commentObject body key.");

          const puttingResult = await collection.replaceOne(dbComment, {
            ...commentObject,
            _id: new ObjectId(
              Array.isArray(idComment) ? idComment[0] : idComment
            ),
          });
          res.json({ status: 200, data: { comment: puttingResult } });
          break;
        case "DELETE":
          if (dbComment === null)
            return res.status(400).json("You can't delete an empty comment.");

          const deletedResult = await collection.deleteOne({
            _id: new ObjectId(
              Array.isArray(idComment) ? idComment[0] : idComment
            ),
          });

          res.json({ status: 200, data: { comment: deletedResult } });
          break;
      }
    }
  } catch (e) {
    res.status(500).json(e);
  }
}
