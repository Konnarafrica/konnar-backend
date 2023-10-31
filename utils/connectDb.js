import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const CONNECTION_URI =
             process.env.MONGODB_URI_PROD; 
        console.log(CONNECTION_URI)
        mongoose.set("strictQuery", false);

        await mongoose.connect(CONNECTION_URI, {
          dbName: "konnarafrica",
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        console.log(`database connected successfully!!!`);
    } catch (error) {
        console.log(`There was an error trying to connect to DB!!! ${error.message}`)
    }
}

export default connectDB;