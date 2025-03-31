import express from "express";

const router = express.Router();

// ✏️ Självständiga Övningar

// 🟢 Lätta Övningar

// - Skapa en router-fil för "products" med GET, POST och DELETE lägg gärna till patch och put och träna och se skillnaderna (hur använder jag dom på ett bra sätt?).

// --------------------------------------
// - Lägg till en middleware som loggar varje anrop i konsolen.

// --------------------------------------
// - Skapa en statusroute (/api/status) som returnerar "Server up and running".

const logger = (req, res, next) => {
  console.log(`this is a logger middleware:${req.url}, ${req.method}`);
  next();
};

const products = [
  { item: "shoes", color: "red", id: 1 },
  { item: "shirt", color: "blue", id: 2 },
];
router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "got the items succesfully!", items: products });
});

router.delete("/:id", (req, res) => {
  const prodId = req.params.id;
  res.status(200).json({ message: `the id number:${prodId} was removed` });
});

router.post("/", (req, res) => {
  const addedProd = req.body;
  res
    .status(200)
    .json({ message: `the item was succesfully added:`, addedProd });
});

export default router;
export { logger };
