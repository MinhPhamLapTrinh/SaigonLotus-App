import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000; // Port number  to run the server

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Employee Object

let employee = [
  {
    id: 1,
    name: "Duc Minh",
    uniqueNum: "112",
    timeRecord: [
      {
        date: new Date().toLocaleString(),
        startTime: null,
        endTime: null,
        totalWorkingHours: 0,
      },
    ],
  },
  {
    id: 2,
    name: "John Doe",
    uniqueNum: "1234",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to Employee App");
});

app.post("/check-in", (req, res) => {
  const pin = req.body.pin; // get the pin from the request body
  console.log(typeof pin);
  const result = employee.find((emp) => parseInt(emp.uniqueNum) === pin); // find the employee with the given pin
  console.log(result);
  if (result) {
    res.status(201).send({ message: "you've been successfully checked in" });
  } else {
    res.status(404).send({ message: "invalid pin" });
  }
});

app.get("/clock-in/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  const result = employee.find((emp) => parseInt(emp.uniqueNum) === id);
  console.log(result);
  if (result) {
    const timeRecord = result.timeRecord[0];
    timeRecord.startTime = new Date().toLocaleString();
    res.status(200).send({
      message: `you've been successfully clocked in at  ${timeRecord.startTime}`,
    });
    console.log(result);
  } else {
    res.status(404).send({ message: "invalid id" });
  }
});

app.get("/clock-out/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = employee.find((emp) => parseInt(emp.uniqueNum) === id);
  if (result) {
    const timeRecord = result.timeRecord[0];
    if (timeRecord.startTime === null) {
      res.status(400).send({ message: "you have to clock in first" });
    } else {
      timeRecord.endTime = new Date().toLocaleString();
      const start = new Date(timeRecord.startTime).getHours();
      console.log(start);
      const end = new Date(timeRecord.endTime).getHours();
      timeRecord.totalWorkingHours = end - start;
      res.status(200).send({
        message: `you've been successfully clocked out at  ${timeRecord.endTime}. Total working hours: ${timeRecord.totalWorkingHours} hours.`,
      });
    }
    console.log(result);
  } else {
    res.status(404).send({ message: "invalid id" });
  }
});

app.post("/add-employee", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
});
