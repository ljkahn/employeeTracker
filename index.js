
const inquirer = require('inquirer');
const config = require('./config/connection');
const util = require('util');
const query = util.promisify(config.query).bind(config);

const initQuestion = [
  {
    type: "list",
    name: "choice",
    message: "Please choose!",
    choices: [
      "View all department.",
      "View all role.",
      "View all employees.",
      "Add a department.",
      "Add a role.",
      "Add an employee.",
      "Update an employee role.",
      "Quit.",
    ],
  },
];

async function init() {
  const { choice } = await inquirer.prompt(initQuestion);
  console.log(choice);
  switch (choice) {
    case "View all department.":
      viewAlldepartment();
      break;
    case "View all role.":
      viewAllRole();
      break;
    case "View all employees.":
      viewAllEmployees();
      break;
    case "Add a department.":
      addADepartment();
      break;
    case "Add a role.":
      addARole();
      break;
    case "Add an employee.":
      addAEmployee();
      break;
    case "Update an employee role.":
      updateEmployeeRole();
      break;
    case "Quit.":
      quit();
      break;
    default:
  }
  return;
}

async function viewAlldepartment() {
  const result = await query("SELECT * FROM department");
  console.table(result);
  init();
}

//create an async function to initialize the application


//use switch statement to perform different actions based on user selection
