import dotenv from "dotenv";
import express from "express";
import fs from "fs";
// import courses from "./courses.json";
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const courses = require("./courses.json");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// // const readFile = fs.readFileSync("courses.json", "utf8");
// // const parsedData = JSON.parse(readFile);
// // console.log(parsedData);

// app.get("/api/courses", (req, res) => {
//   res.status(200);
//   //   res.json(parsedData);
//   res.json(courses);
//   // även fasr courses är JSON format måste ja ändå ha .json
// });

// app.listen(PORT, () => {
//   console.log(`servern kör på http://localhost:${PORT}`);
// });

// // 1. res.json()
// // Syfte: res.json() används för att skicka ett
// //  JavaScript-objekt eller en array som svar på en förfrågan,
// //  och det omvandlar automatiskt objektet till JSON-format.

// // 2. res.send()
// // Syfte: res.send() används för att skicka vilken som helst av de
// // vanliga typerna av svar, inklusive text, HTML eller JSON. Om du skickar
// //  ett JavaScript-objekt med res.send(), kommer Express automatiskt att
// //   konvertera det
// // till en JSON-sträng, men det sätter inte alltid rätt Content-Type.

// 5: Implementera en DELETE-route:

// Endpoint: /api/courses/:id

// Använd req.params för att hitta kursen med angivet ID och ta bort den.

// Returnera den uppdaterade listan.

app.use(express.json());
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const cars = require("./cars.json");

// //CRUD , create, read, update, delete
// //read
// app.get("/api/cars", (req, res) => {
//   res.json(cars);
//   res.status(200);
// });

// //create
// app.post("/api/cars", (req, res) => {
//   const newData = req.body;
//   res.json({ message: `ny användare skapad`, user: newData });
//   res.status(200);
// });

// //Update

// app.put("/api/cars/:id", (req, res) => {
//   const carId = req.params.id;
//   const newData = req.body;
//   res.status(200);
//   res.json({
//     message: `användare med id: ${carId} är uppdaterad`,
//     newCar: newData,
//   });
// });

// //delete
// app.delete("/api/cars/:id", (req, res) => {
//   const carID = req.params.id;
//   res.status(200);
//   res.json({ message: `car with id: ${carID} is removed` });
// });
// app.listen(PORT, () => {
//   console.log(`servern kör på http://localhost:${PORT}`);
// });

// app.post("/api/info", (req, res) => {
//   const data = req.body;
//   res.status(200);
//   res.json([{ message: `datan du skickade kom in som förväntat`, data: data }]);
// });

// app.listen(PORT, () => {
//   console.log(`servern kör på http://localhost:${PORT}`);
// });

// const readFile = fs.readFileSync("courses.json", "utf8");
// const parsedData = JSON.parse(readFile);
// console.log(parsedData);

// app.delete("/api/courses/:id", (req, res) => {
//   const courseId = parseInt(req.params.id);
//   const updatedData = parsedData.filter((id) => {
//     return id.id !== courseId;
//   });
//   res.status(200);
//   res.json({
//     message: `course with id${courseId} was removed`,
//     data: updatedData,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`servern körs på http://localhost:${PORT}`);
// });

// svårt o tänka var datan ska komma ifrån men tänk:
//datan är i backend där jag är nu..så skapar en fake / mockup JSON fil
// den har ju nån i front end tagit en GET på så de har listan me alla
//kurser...sen skickar nån en delete request med ID o uppdaterar
// den mockup fake datan så skickar ja tillbaka en response me
// uppdaterad lista och meddelande vilket ID som tagits bort..
//jobba med postman!
//den listan med mock upp är i en json fil så jag läser därifrån
// uppdaterar den efter me!

// Läs kurser från filen
const getCourses = () => {
  const courseData = JSON.parse(fs.readFileSync("courses.json", "utf8"));
  const courses = courseData.courses;
  console.log("hej", courses);
  return courses;
};

// Spara kurser tillbaka till filen
const saveCourses = (courses) => {
  fs.writeFileSync("courses.json", JSON.stringify(courses, null, 2), "utf8");
};

// DELETE-route för att ta bort en kurs baserat på ID
app.delete("/api/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id); // Konvertera till heltal
  let courses = getCourses(); // Hämta kurser från filen

  // Hitta index för kursen med det angivna ID:t
  const courseIndex = courses.findIndex((course) => course.id === courseId);

  if (courseIndex === -1) {
    // Om kursen inte finns, returnera 404
    return res
      .status(404)
      .json({ message: `Course with ID ${courseId} not found` });
  }

  // Ta bort kursen från listan
  courses.splice(courseIndex, 1);

  // Spara den uppdaterade listan tillbaka till filen
  saveCourses(courses);

  // Skicka tillbaka den uppdaterade listan
  res.status(200).json({
    message: `Course with ID ${courseId} was removed.`,
    data: courses,
  });
});

app.listen(PORT, () => {
  console.log(`Servern kör på http://localhost:${PORT}`);
});
