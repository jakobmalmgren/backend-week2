import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/api/greet/:jakob", (req, res) => {
  const params = req.params.jakob;
  console.log(params);

  res.json([
    {
      message: `hejsan ${params}`,
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`server körs på http://localhost:${PORT}`);
});
