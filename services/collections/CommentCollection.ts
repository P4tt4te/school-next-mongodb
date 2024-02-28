import { DatabaseService } from "services/DatabaseService";

export const CommentCollection = async () => {
  const db = await DatabaseService();
  return db.collection("comments");
};
