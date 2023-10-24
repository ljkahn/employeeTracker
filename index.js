const question = require('./questions/questions');
const inquirer = require('inquirer');
const db = require('./config/connection');
const util = require('util');

// promisified object variable for querying the database
const query = util.promisify(db.query).bind(db);

// async function to start the app
const init = async () => {
  try {

    const answers = await inquirer.prompt(question.askQuestion(question.createList));
    const choice = answers.Choice;

  
  switch (choice) {
    case 1:
      viewAllEmployees();
      break;
    case 2:
      addEmployee();
      break;
    case 3:
      updateEmployeeRole();
      break;
    case 4:
      viewAllRoles();
      break;
    case 5:
      addRole();
      break;
    case 6:
      viewAllDepartments();
      break;
    case 7:
      addDepartment();
      break;
    case 8:
      console.log('Goodbye');
      process.exit();
    default:
      console.log('Invalid Choice');
    }
  } catch (err) {
    console.error(err);
  }
}

async function viewAllEmployees() {

    const result = await query(`SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS name, r.title, d.name AS department, r.salary, CONCAT(e2.first_name, " ", e2.last_name) AS manager FROM employee AS e JOIN role AS r ON r.id = e.role_id LEFT JOIN employee AS e2 ON e.manager_id = e2.id JOIN department AS d ON d.id = r.department_id ORDER BY e.id`);
    
    // display results as a table
    console.table(result);

    init();
}

async function addEmployee() {
  // query the database to get list of roles and managers
  const roles = await query('SELECT title AS name, id AS value FROM role');
  const manager = await query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee WHERE manager_id IS null');

  manager.push({
    name: 'No Manager',
    value: null,
  });

  // questions for adding an employee
  const questions = [
    {
      type: 'input',
      name: 'first_name',
      message: `Enter the employee's first name:`
    },
    {
      type: 'input',
      name: 'last_name',
      message: `Enter the employee's last name:`
    },
    {
      type: 'list',
      name: 'role_id',
      message: `Enter the ID number of the employee's role:`,
      choices: roles,
    },
    {
      type: 'list',
      name: 'manager_id',
      message: `Enter the ID number of the employee's manager:`,
      choices: manager,
    }
  ];

  // Prompt the user for employee information and store the responses
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt(questions);

  // Insert the new employees information into the database
  await query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`,
    [first_name, last_name, role_id, manager_id]
  );
  

  console.log(`${first_name} ${last_name} has been added to the employee database.`);


  viewAllEmployees();
}

async function updateEmployeeRole() {
  // Query the database for employee, role, and manager information
  const employee = await query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee');
  const role = await query('SELECT title AS name, id AS value FROM role');
  const manager = await query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee WHERE manager_id IS null');
  manager.push({
    name: 'No Manager',
    value: null,
  });
  // Define the questions to prompt the user for updating employee role
  const questions = [
    {
      type: 'list',
      name: 'name',
      message: 'Please select the employee whose role needs updating:',
      choices: employee,
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Please select the new role for the selected employee:',
      choices: role
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Please update the manager for the selected employee:',
      choices: manager
    },
  ];

  const { name, role_id, manager_id } = await inquirer.prompt(questions);
  // Update the employee data with the input from the user
  await query(
    'UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?',
    [role_id, manager_id, name]
  );
  // Display a success message
  console.log(`Employee's role has been updated!`);
  // Display the employees table to show updates and return to the main menu
  viewAllEmployees();
}

async function viewAllRoles() {
  // Add to query to join department names instead of having the department id in the table
  const result = await query(`SELECT role.id, title, department.name AS department, salary FROM role JOIN department ON department.id = role.department_id`);
  // Display the table
  console.table(result);
  // Return to main menu
  init();
}

