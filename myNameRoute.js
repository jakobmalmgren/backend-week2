import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/name", (req, res) => {
  res.json([
    {
      name: "jakob",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`du kör på servern http://localhost:${PORT}/api/name`);
});
