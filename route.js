// SÅ NÄR VI SKICKAR UPP DATA FRÅN KLIENT TILL SERVER OCH FRÅN SERVER TTILL KLIENT,
//  ALLTID OMVANDA TILL JSON FORMAT?

// ChatGPT sade:
// Nej, det är inte alltid nödvändigt att omvandla data till
// JSON-format, men i de flesta fall, särskilt när du arbetar med webb-API:er,
//  är det standard att använda JSON. Låt mig förklara när och varför du använder

// Servern tar emot JSON-data i req.body, och eftersom vi använder
// express.json() middleware, omvandlas den automatiskt från en JSON-sträng
//  till ett JavaScript-objekt de gör de väl utan de me? för klienten skickar
//   ju upp i form a json?

// ChatGPT sade:
// Bra fråga! Det stämmer att klienten skickar data i form av JSON
// (t.ex. i POST-förfrågningar). Dock, servern måste använda middleware
// (som express.json()) för att kunna tolka och omvandla den JSON-sträng
// som klienten skickar till ett JavaScript-objekt.

import express from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Route för root-enpoint
app.get("/", (req, res) => {
  res.send("välkommen till min express server!");
});

// API Route som ska retunera JSON med json()
//res.json omvanlar de till json sträng/format
// FRÅGA: SKA MAN TÄNKA DÅ ATT KLIENTE GÖR EN GET I DETTA FALLET??
// O SEN RESPONSEN VI SKICKAR TILLBAKA ÄR MEDDELANDET I JSON FORMAT
app.get("/api", (req, res) => {
  res.json([
    {
      message: "apiet 1 fungerar",
      status: 200,
    },
  ]);
});

// API Route som ska retunera JSON med send()
//res.send, omvandlar responsen automatiskt till json sträng/format
app.get("/api2", (req, res) => {
  res.send([
    {
      message: "api 2 send ok!",
      status: 200,
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`servern körs på : http://localhost:${PORT}`);
});
