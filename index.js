import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
// import { logRequests2 } from "./middlewarefolder/logger.js";
// import errorHandler from "./middlewarefolder/errorhandler.js";
// import requestCounter from "./middlewarefolder/requestCounter.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const KEY = process.env.KEY;

// // morgan 3:e parts bibliotek/middleware loggar inkommande requests till teminalen.

// // "dev"  är ett fördefinierat format som visar metod, URL, statuskod, svarstid och storlek på svaret.

// app.use(morgan("dev"));
// app.use(logRequests2);
// app.use(requestCounter);

// app.get("/", (req, res) => {
//   res.send("helllo middleware");
// });

// // En route som avsiktligen kastar ett fel för demonstrations syfte

// app.get("/error", (req, res) => {
//   throw new Error("simulerat kastat fel");
// });

// app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`servern körs på : http://localhost:${PORT}}`);
// });

//1
const logger = (req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] your method is ${req.method}, URL: ${
      req.url
    }  `
  );
  next(); // om inte next kommer den stanna vid första rutten ex get o bara få info
  // om url etc där o intte info om ex POST requesten..
};

//2
const time = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(`time took ${duration} ms`);
  });
  next();
};
//4
const ipLogger = (req, res, next) => {
  const ip = req.ip;
  const date = new Date().toISOString().replace("T", " ").slice(0, 19);
  const url = req.url;
  const method = req.method;
  console.log(`This is the logger:[${date}] ${method} ${url} - IP:${ip}`);
  next();
};

//5
const authentification = (req, res, next) => {
  if (req.method === "GET") {
    return next(); // Tillåt GET utan autentisering
  }
  const reqApiKey = req.headers["x-api-key"];
  if (reqApiKey === KEY) {
    console.log("Key is valid");
    next();
  } else if (!reqApiKey) {
    return res.status(401).send({ message: "Unauthorized" });
  } else if (reqApiKey !== KEY) {
    return res.status(401).send({ message: "fel nyckel" });
  }
};

const authentificationLogger = (req, res, next) => {
  const key = req.headers["x-api-key"];
  console.log(`autentifiseringslogger med key: ${key ? key : "no key"}`);
};

// Uppgift:
// Skapa en autentiseringsmiddleware som kräver en API-nyckel i headers:
// - Om nyckeln saknas eller är felaktig, returnera 401 Unauthorized.
// - Använd en miljövariabel för att lagra den korrekta nyckeln.
// - Logga alla autentiseringsförsök.

// Tips:
// Använd dotenv för att hantera miljövariabler.

/////////////////////////////////////////////////////////////////

//1
app.use(logger);

//2
app.use(time);

//4
app.use(ipLogger);

// 5
app.use(authentification);
app.use(authentificationLogger);

app.get("/", (req, res) => {
  res.send("get");
});
app.post("/", (req, res) => {
  res.send("post");
});
app.put("/", (req, res) => {
  res.send("put");
});
app.delete("/:id", (req, res) => {
  res.send("delete");
});

app.listen(PORT, () => {
  console.log(`servern körs på : http://localhost:${PORT}`);
});

// Lätta övningar

// 📝 1. Enkel Request Loggning

// Uppgift:
// Skapa en middleware som loggar följande:
// - Metod (GET, POST, PUT, DELETE)
// - URL
// - Tidpunkt

// Exempelutskrift:
// [2025-03-25 14:30:45] GET /api/users

// Tips:
// Använd new Date().toISOString() för tidsstämpeln.

// 📝 2. Respons Tidsmätning

// Uppgift:
// Skapa en middleware som mäter tiden det tar för en request att bli besvarad.
// Logga sedan tiden i konsolen.

// Exempelutskrift:
// Request till /api/data tog 52 ms.

// Tips:
// Använd Date.now() för att mäta start- och slutid.

// 📝 4. IP-Loggning

// Uppgift:
// Skapa en middleware som loggar IP-adressen för varje inkommande request.
// - Lägg till IP-adressen i samma loggradering som metod och URL.

// Exempelutskrift:
// [2025-03-25 14:31:00] GET /api/products - IP: 192.168.0.1

// Tips:
// Använd req.ip eller req.connection.remoteAddress för att få IP-adressen.

// 📝 5. API-Key Autentisering

// Uppgift:
// Skapa en autentiseringsmiddleware som kräver en API-nyckel i headers:
// - Om nyckeln saknas eller är felaktig, returnera 401 Unauthorized.
// - Använd en miljövariabel för att lagra den korrekta nyckeln.
// - Logga alla autentiseringsförsök.

// Tips:
// Använd dotenv för att hantera miljövariabler.
