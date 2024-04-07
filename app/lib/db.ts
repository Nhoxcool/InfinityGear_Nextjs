import mongoose from "mongoose";

let connection: typeof mongoose;

const url = 'mongodb://127.0.0.1:27017/Infinity_Gear';
const startDb = async () => {
    try {
        if(!connection){
            connection = await mongoose.connect(url)
        } 
        return connection
    } catch (error) {
        throw new Error((error as any).message);
    }
}

export default startDb;