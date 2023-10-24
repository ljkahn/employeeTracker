const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db`)
);

// User selects: "View all Employees"
// Table for employee must populate
function viewAllEmployees(callback) {
  db.query(
    "SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name,' ', m.last_name) AS manager FROM employee e INNER JOIN role r on e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id",
    // FROM employee e INNER JOIN role r on e.role_id = r.id
    // INNER JOIN department d ON r.department_id = d.id
    // LEFT JOIN employee m ON e.manager_id = m.id
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results, [
          "id",
          "first_name",
          "last_name",
          "title",
          "department",
          "salary",
          "manager",
        ]);
      }
      callback();
    }
  );
}

// User selects: "Add Employee"
// Prompts:
// what is the employee's first name?
// what is the employee's last name?
// what is the employee's role (list)
// who is the employee's manager (list)
// Message: this employee has been added to the db

function addEmployee(callback) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
        ],
        name: "role",
      },
      {
        type: "list",
        message: "Who is this employee's manager?",
        choices: [
          "John Doe",
          "Mike Chan",
          "Ashley Rodriguez",
          "Kevin Tupik",
          "Kunal Singh",
        ],
        name: "manager",
      },
    ])
    .then((answers) => {
      // matches the departments to their ids
      const roleMappings = {
        "Sales Lead": 1,
        "Sales Person": 2,
        "Lead Engineer": 3,
        "Software Engineer": 4,
        "Account Manager": 5,
      };

      // matches the managers to their ids
      const managerMappings = {
        "John Doe": 1,
        "Mike Chan": 2,
        "Ashley Rodriguez": 3,
        "Kevin Tupik": 4,
        "Kunal Singh": 5,
      };

      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

      const roleId = roleMappings[answers.role];
      const managerId = managerMappings[answers.manager];

      db.query(
        query,
        [answers.firstName, answers.lastName, roleId, managerId],
        (err, res) => {
          if (err) {
            console.log("Error inserting employee:", err);
          } else {
            console.log("This employee has been added to the db.");
            viewAllEmployees(callback);
          }
        }
      );
    });
}

// UPDATE EMPLOYEE ROLE
// which employee's role would you like to update? (list)
// which role do you want to assign to the selected employee? (list)
// updated employee's role?
function updateRole(callback) {
  db.query(
    // going into employee table and setting first_name and last_name to employee_name
    "SELECT CONCAT (first_name, ' ', last_name) AS employee_name FROM employee",
    (err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      // creates a new array given the results from the db query
      // we want to return the employee_name
      const employeeNames = res.map((result) => result.employee_name);

      // going into the role table and selecting the titles
      db.query("SELECT title FROM role", (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        // creates a new array given the results from the db query, we want to return only titles
        const roles = res.map((result) => result.title);

        inquirer
          .prompt([
            {
              type: "list",
              message: "Which employee's role would you like to update?",
              choices: employeeNames,
              name: "reassignedEmployee",
            },
            {
              type: "list",
              message:
                "Which role do you want to assign to the selected employee?",
              choices: roles,
              name: "reassignedRole",
            },
          ])
          .then((answers) => {
            console.log("Updated employee's role.");
            viewAllEmployees(callback);
          });
      });
    }
  );
}

// User selects: "View All Roles"
// Table for Roles must populate
function viewAllRoles(callback) {
  db.query(
    // SELECT r.id, r.title, d.name AS department, r.salary
    // specifies the columns that we want to retrieve from the tables, rename d.name as department

    // role r INNER JOIN department d (stating aliases of r and d)
    // join on r.department_id = d.id
    "SELECT r.id, r.title, d.name AS department, r.salary from role r INNER JOIN department d ON r.department_id = d.id",
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results, ["id", "title", "department", "salary"]);
      }
      callback();
    }
  );
}

// User selects: "Add Role"
// What is the name of this role? input
// What is the salary of this role? input
// Which department does this role belong to? list
// Added "name of role" to the db
function addRole(callback) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of this role?",
        name: "role",
      },
      {
        type: "input",
        message: "What is the salary of this role?",
        name: "salary",
      },
      {
        type: "list",
        message: "Which department does this role belong to?",
        choices: ["Engineering", "Finance", "Legal", "Sales"],
        name: "department",
      },
    ])
    .then((answers) => {
      const departmentMappings = {
        Engineering: 1,
        Finance: 2,
        Legal: 3,
        Sales: 4,
      };

      const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

      const departmentId = departmentMappings[answers.department];

      db.query(
        query,
        [answers.role, answers.salary, departmentId],
        (err, res) => {
          if (err) {
            console.log("Error inserting role:", err);
          } else {
            console.log("This role has been added to the db.");
            viewAllRoles(callback);
          }
        }
      );
    });
}

// User selects: "View All Departments"
// Table for departments must populate
function viewAllDepartments(callback) {
  db.query("SELECT id, name FROM department", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.table(results, ["id", "name"]);
    }
    callback();
  });
}

// ADD DEPARTMENT
// What is the name of the department?
function addDepartment(callback) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "department",
      },
    ])
    .then((answers) => {
      const query = `INSERT INTO department (name) VALUES (?)`;

      db.query(query, [answers.department], (err, res) => {
        if (err) {
          console.log("Error inserting department:", err);
        } else {
          console.log("This department has been added to the db.");
          viewAllDepartments(callback);
        }
      });
    });
}

// QUIT?

module.exports = {
  viewAllEmployees,
  updateRole,
  addEmployee,
  viewAllRoles,
  addRole,
  viewAllDepartments,
  addDepartment,
};