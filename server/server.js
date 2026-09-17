import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/configs/connectDB.js";

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
