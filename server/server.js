import dns from "dns";
import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/configs/connectDB.js";

// Only override DNS on local dev machines (e.g. Windows/ISP resolver workarounds)
// In cloud containers (Render/Railway), use the host's native VPC resolver
if (process.env.NODE_ENV !== "production") {
  try {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  } catch (e) {
    console.log("Local DNS override skipped:", e.message);
  }
}

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
