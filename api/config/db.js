import mongoose from "mongoose";



const connectDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    const conn = await mongoose.connect(
     
    // 'mongodb://localhost:27017/new'
    );
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`);
  }
};

export default connectDB;
