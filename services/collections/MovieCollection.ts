import { DatabaseService } from "services/DatabaseService";

export const MovieCollection = async () => {
  const db = await DatabaseService();
  return db.collection("movies");
};
