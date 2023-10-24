const question = require('./questions/questions');
const inquirer = require('inquirer');
const db = require('./config/connection');
const util = require('util');


const query = util.promisify(db.query).bind(db);

//async function to start app

const init = async () => {
  try {
    const answers = await inquirer.createPromptModule(question.askQuestion(question.createList))
    const choice = answers.choice;




    switch(choice) {
      case 1:
        viewAllEmployees();
        break;
      case 2:
          addEmployee();
          break;
        case 3:
          updateEmployee();
          break;
        case 4:
          addRole();
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
     }
  } catch (err) {
    console.error(err);
  }
}

async function viewAllEmployees() {
  const result = await query(`SELECT else.id, CONCAT(e.first_name, " ", e.last_name) AS name, r.title, d.name AS department, r.salary, CONCAT(e2.last_name) AS manager FROM employee AS e JOIN role AS r ON r.id = e.role_id LEFT JOIN employee AS e2 ON e.manager_id = e2.id JOIN department AS d ON d.id = r.department_id ORDER BY e.id`)

  console.table(result);

  init();
}


async function addEmployee() {
  const roles = await query('SELECT title AS name, id AS value FROM role');
  const manager = await query('SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee WHERE manager_id IS null');
  
  manager.push({
    name: 'No Manager',
    value: null,
  });
}