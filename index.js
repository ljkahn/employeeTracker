const inquirer = require("inquirer");
const dbFunctions = require("./dbFunctions");

function mainSelection() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
        name: "selection",
      },
    ])
    .then((answer) => {
      switch (answer.selection) {
        case "View all Employees":
          dbFunctions.viewAllEmployees(mainSelection);
          break;
        case "Add Employee":
          dbFunctions.addEmployee(mainSelection);
          break;
        case "Update Employee Role":
          dbFunctions.updateRole(mainSelection);
          break;
        case "View All Roles":
          dbFunctions.viewAllRoles(mainSelection);
          break;
        case "Add Role":
          dbFunctions.addRole(mainSelection);
          break;
        case "View All Departments":
          dbFunctions.viewAllDepartments(mainSelection);
          break;
        case "Add Department":
          dbFunctions.addDepartment(mainSelection);
          break;
      }
    });
}

mainSelection();