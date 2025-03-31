import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "server is upp and running" });
});

export default router;
