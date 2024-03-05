import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://akshatmaurya25:%4025%40MongoDB@cluster0.yqqotp9.mongodb.net/Sleek`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Connected To mongoDB ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error found : ${err}`);
  }
};

export default connectDB;
