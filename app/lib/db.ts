import mongoose from "mongoose";

let connection: typeof mongoose;

const url = process.env.DB_URL as string;
const startDb = async () => {
  try {
    if (!connection) {
      connection = await mongoose.connect(url);
    }
    return connection;
  } catch (error) {
    throw new Error((error as any).message);
  }
};

export default startDb;
