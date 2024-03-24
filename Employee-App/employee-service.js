import mongoose from "mongoose";
import env from "dotenv";
env.config();

let mongoDBConnectionString = process.env.MONGO_URI;

let Schema = mongoose.Schema;

let timeRecordSchema = new Schema({
  date: Date,
  startTime: Date,
  endTime: Date,
  totalWorkingHours: Number,
});

let employeeSchema = new Schema({
  employeeName: String,
  uniqueNum: String,
  timeRecord: [timeRecordSchema],
});

let Employee;

export function connect() {
  return new Promise(function (resolve, reject) {
    let db = mongoose.createConnection(mongoDBConnectionString);

    db.on("error", (err) => {
      reject(err);
    });

    db.once("open", () => {
      Employee = db.model("Employee", employeeSchema);
      resolve();
    });
  });
}

export function addEmployee(name, uniqueNum) {
  return new Promise(function (resolve, reject) {
    const newEmployee = new Employee({
      employeeName: name,
      uniqueNum: uniqueNum,
    });

    newEmployee
      .save()
      .then(() => {
        resolve("Employee " + newEmployee.employeeName + " successfully added");
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function checkInEmployee(uniqueNum) {
  return new Promise(function (resolve, reject) {
    Employee.findOne({ uniqueNum: uniqueNum })
      .exec()
      .then((emp) => {
        resolve(emp);
      })
      .catch((err) => {
        reject("invalid pin " + err);
      });
  });
}

export function employeeClockIn(id) {
  return new Promise(function (resolve, reject) {
    Employee.findById(id)
      .exec()
      .then((emp) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const lastRecord = emp.timeRecord[emp.timeRecord.length - 1];
        if (
          lastRecord &&
          new Date(lastRecord.date).setHours(0, 0, 0, 0) === today
        ) {
          reject("You have already clocked in today");
        } else {
          const startTime = new Date().toLocaleString();
          emp.timeRecord.push({
            date: startTime,
            startTime: startTime,
            endTime: null,
            totalWorkingHours: 0,
          });
          console.log(emp);
          emp
            .save()
            .then(() => {
              resolve(`you've been successfully clocked in at  ${startTime}`);
            })
            .catch((err) => {
              reject(`Cannot clock in ` + err);
            });
        }
      });
  });
}

export function employeeClockOut(id) {
  return new Promise(function (resolve, reject) {
    Employee.findById(id)
      .exec()
      .then((emp) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const timeRecord = emp.timeRecord[emp.timeRecord.length - 1];
        if (
          !timeRecord ||
          new Date(timeRecord.startTime).setHours(0, 0, 0, 0) !== today
        ) {
          reject("You have to clock in first!");
        } else {
          const endTime = new Date().toLocaleString();
          const start = new Date(timeRecord.startTime).getHours();
          console.log(start);
          const end = new Date(timeRecord.endTime).getHours();
          const totalWorkingHours = end - start;
          Employee.updateOne(
            {
              _id: id,
              "timeRecord._id": timeRecord._id,
            },
            {
              $set: {
                "timeRecord.$.endTime": endTime,
                "timeRecord.$.totalWorkingHours": totalWorkingHours,
              },
            }
          )
            .then(() => {
              resolve(
                `you've been successfully clocked out at  ${endTime}. Total working hours: ${totalWorkingHours} hours.`
              );
            })
            .catch((err) => {
              reject(`Cannot clock out due to ${err}`);
            });
        }
      });
  });
}

export function getAllEmployeeByDate(date) {
  return new Promise(function (resolve, reject) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    Employee.find({}).then((employees) => {
      const filteredEmployees = employees.map((emp) => {
        return emp.timeRecord
          .filter((time) => {
            return (
              new Date(time.date) >= startOfDay &&
              new Date(time.date) <= endOfDay
            );
          })
          .map((filteredDate) => {
            return {
              employeeName: emp.employeeName,
              startTime: filteredDate.startTime.toLocaleString(),
              endTime: filteredDate.endTime.toLocaleString(),
              totalWorkingHours: filteredDate.totalWorkingHours,
            };
          });
      });
      resolve(filteredEmployees);
    });
  });
}
