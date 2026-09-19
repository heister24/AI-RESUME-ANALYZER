import dns from "dns";
import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/configs/connectDB.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
