import clientPromise from "@/lib/mongodb";

const DATABASE_NAME = "sample_mflix";

export const DatabaseService = async () => {
  const client = await clientPromise;
  return client.db(DATABASE_NAME);
};
