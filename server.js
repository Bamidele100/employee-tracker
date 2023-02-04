//Dependencies for the application
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const express = require("express");

// declare port
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'employeeTracker_db',
      port: 3306
  },
  // console.log employee tracker database
  console.log(`Connected to the employeeTracker_db database.`)
);
db.connect(function(err) {
  if (err) throw err;
  showData();
  //  connection.end();//
});

// inquirer prompts
function showData() {
  inquirer.prompt({
      type: "list",
      name: "result",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "finish"
      ]
      
    })
      .then(function(data) {
        console.log("You have inputted: " + data.result);
  
        switch (data.result) {
          case "Add department":
           sumUpDepartment();
            break;
          case "Add role":
            sumUpRole();
            break;
          case "Add employee":
            sumUpEmployee();
            break;
          case "View departments":
            showDepartment();
            break;
          case "View roles":
            showRoles();
            break;
          case "View employees":
            showEmployees();
            break;
          case "Update employee role":
            updateEmployee();
            break;
          default:
            finish();
        }
      });
  }

function sumUpDepartment() {
    inquirer.prompt({
      
        type: "input",
        message: "What is the department name ?",
        name: "department_Name"

    }).then(function(answer){
       db.query("INSERT INTO department (name) VALUES (?)", [answer.department_Name] , function(err, res) {
            if (err) throw err;
            console.table(res)
            showData()
    })
    // console.log(answer);
    })
}

function sumUpRole() {
  inquirer.prompt([
      {
        type: "input",
        message: "What is role name?",
        name: "roleTitle"
      },
      {
        type: "input",
        message: "What is role salary?",
        name: "roleSalary"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "roleID"
      }
    ])
    // insect employee  roles with title salary department IDs into the database
    .then(function(answer) {
      db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleTitle, answer.roleSalary, answer.roleID], function(err, res) {
        if (err) throw err;
        console.table(res);
        showData();
      });
      // console.log(answer);
    });
}

function sumUpEmployee() {
  inquirer.prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "lastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ])
    // insect employee names, role IDs and manager IDs into the database
    .then(function(answer) {
      db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);
        showData();
      });
      // console.log(answer);
    });
}
function updateEmployee() {
  inquirer.prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employtee_Update"
      },
      {
        type: "input",
        message: "What you want to update to?",
        name: "employee_updateRole"
      }
    ])
    // update employee names, role IDs into the database
    .then(function(answer) {
      db.query("UPDATE employee SET role_id=? WHERE first_name= ?",[answer.employtee_Update, answer.employee_updateRole],function(err, res) {
        if (err) throw err;
        console.table(res);
        showData();
      });
      // console.log(answer);
    });
}
function showDepartment() {
  let query = "select * from department";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    showData()
  });
  // displays department in console.table
}

function showRoles() {
  let query = "select * from role";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    showData();
  });
  // displays role in console.table
}

function showEmployees() {
  // select from the db
  let query = "select* from employee";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    showData();
  });
    // displays employees in console.table
}

function finish() {
  db.end();
  process.exit();
}
// finish executing to exit