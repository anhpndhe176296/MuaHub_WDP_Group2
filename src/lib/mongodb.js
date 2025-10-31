// lib/mongodb.js
import { MONGODB_CONNECT } from "@muahub/constants/MainContent";
import { MongoClient } from "mongodb";

const uri = MONGODB_CONNECT;
const options = {
<<<<<<< Updated upstream
  useNewUrlParser: true // Loại bỏ useUnifiedTopology
=======
<<<<<<< Updated upstream
  useNewUrlParser: true // Loại bỏ useUnifiedTopology
=======
  // useNewUrlParser: true // Loại bỏ useUnifiedTopology
>>>>>>> Stashed changes
>>>>>>> Stashed changes
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;
clientPromise
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

export default clientPromise;
