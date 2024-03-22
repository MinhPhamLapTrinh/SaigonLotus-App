import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
env.config();

import * as employeeService from "./employee-service.js";

const app = express();
const PORT = 4000; // Port number  to run the server
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Employee App");
});

app.post("/check-in", (req, res) => {
  const pin = req.body.pin; // get the pin from the request body
  const selection = req.body.selection;
  employeeService
    .checkInEmployee(pin)
    .then((emp) => {
      console.log(selection);
      res.redirect(`/${selection}/${emp.uniqueNum}`);
    })
    .catch((err) => {
      res.status(422).json({ message: err });
    });
});

app.get("/clock-in/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const employee = await employeeService.checkInEmployee(id);

    const msg = await employeeService.employeeClockIn(employee._id);

    res.json({ message: msg });
  } catch (err) {
    res.status(422).send({ message: err });
  }
});

app.get("/clock-out/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const employee = await employeeService.checkInEmployee(id);

    const msg = await employeeService.employeeClockOut(employee._id);

    res.json({ message: msg });
  } catch (err) {
    res.status(422).send({ message: err });
  }
});

app.post("/add-employee", (req, res) => {
  employeeService
    .addEmployee(req.body.name, req.body.uniqueNum)
    .then((msg) => {
      res.json({ message: msg });
    })
    .catch((err) => {
      res.status(422).send({ message: err });
    });
});

app.get("/employee/:uniqueNum", async (req, res) => {
  const uniqueNum = req.params.uniqueNum;

  console.log(uniqueNum);
  await employeeService
    .checkInEmployee(uniqueNum)
    .then((emp) => {
      const startTime = new Date(
        emp.timeRecord[emp.timeRecord.length - 1].startTime
      ).toLocaleString();
      const endTime = new Date(
        emp.timeRecord[emp.timeRecord.length - 1].endTime
      ).toLocaleString();
      res.json({
        message: `Employee ${
          emp.employeeName
        } has clocked in at ${startTime} and clocked out at ${endTime}. Total hours: ${
          emp.timeRecord[emp.timeRecord.length - 1].totalWorkingHours
        }`,
      });
    })
    .catch((err) => {
      res.status(422).send({ message: msg });
    });
});

employeeService
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("unable to start the server: " + err);
    process.exit();
  });
