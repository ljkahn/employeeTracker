const questions =
{
  type: "list",
  message: "What would you like to do?",
  choices: [
    "View All Employees",
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
    "Quit"
  ]
}





//create function to initialize app
function init() {
  //inquirer prompt for questions
  inquirer.prompt(questions)
    .then((data)



    )
}
init();
